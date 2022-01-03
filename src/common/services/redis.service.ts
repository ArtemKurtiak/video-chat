import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

const redis = createClient();

import { redisKeysEnum } from '../constants/redisKeys.enum';
import { IMessageRedis, IUserRedis } from '../interfaces/redis.interface';

@Injectable()
export class RedisService {
  async get(key: string): Promise<[]> {
    return new Promise(function (resolve) {
      redis.get(key, function (err, data) {
        resolve(JSON.parse(data));
      });
    });
  }

  async set(key: string, value: any) {
    await redis.set(key, JSON.stringify(value));
  }

  async returnAndReplaceData(key: string, value: any) {
    const data = await this.get(key);

    await this.set(key, value);

    return data;
  }

  async updateUserSocketId(userId: number, socketId: string) {
    const users: IUserRedis[] = await this.get(redisKeysEnum.users);

    const filteredUsers = users.filter(
      (item: IUserRedis) => item.userId !== userId,
    );

    filteredUsers.push({ userId, socketId });

    await this.set(redisKeysEnum.users, filteredUsers);
  }

  async getUserDataByUserId(userId: number): Promise<IUserRedis | null> {
    const users = await this.get(redisKeysEnum.users);

    const userById = users.find((item: IUserRedis) => item.userId == userId);

    return userById;
  }

  async sendMessage(dto: IMessageRedis) {
    const messages: IMessageRedis[] =
      (await this.get(redisKeysEnum.messages)) || [];

    messages.push(dto);

    await this.set(redisKeysEnum.messages, messages);
  }

  async getMessagesByChat(chatId: number) {
    const allMessages: IMessageRedis[] =
      (await this.get(redisKeysEnum.messages)) || [];

    return allMessages.filter((item) => item.chat == chatId);
  }
}
