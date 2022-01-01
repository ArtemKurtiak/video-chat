import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Chat } from './entities/chat.entity';
import { IMessageUser } from './interfaces';
import { Message } from './entities';
import { User } from '../auth/entities';
import { RedisService } from '../common/services';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private redisService: RedisService,
  ) {}

  async sendMessage(dto: IMessageUser) {
    const { to, from } = dto;

    const chatExists = await this.chatRepository.findOne({
      where: {
        users: [to, from],
      },
    });

    if (!chatExists) {
      const toUser = await this.userRepository.findOne({
        where: {
          id: to,
        },
      });

      const fromUser = await this.userRepository.findOne({
        where: {
          id: from,
        },
      });

      const chat = await this.chatRepository.create({
        messages: [],
        users: [toUser, fromUser],
      });

      await this.redisService.sendMessage({
        to,
        from,
        chat: chat.id,
      });

      await this.chatRepository.save(chat);

      return;
    }

    await this.redisService.sendMessage({
      to,
      from,
      chat: chatExists.id,
    });
  }
}
