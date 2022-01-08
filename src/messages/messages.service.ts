import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from '../chat/entities';
import { Chat } from '../chat/entities';
import { User } from '../auth/entities';
import { RedisService } from '../common/services';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private redisService: RedisService,
  ) {}

  async getMessagesByChatId(chatId: number): Promise<any> {
    const chatExists = await this.chatRepository.findOne({
      where: {
        id: chatId,
      },
    });

    if (!chatExists) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }

    const chat: Chat = await this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.id = :id', { id: chatId })
      .leftJoinAndSelect('chat.messages', 'message')
      .leftJoinAndSelect('message.from', 'messageFrom')
      .leftJoinAndSelect('chat.users', 'users')
      .getOne();

    const redisMessages = await this.redisService.getMessagesByChat(chatId);

    return {
      ...chat,
      messages: [...chat.messages, ...redisMessages],
    };
  }

  async getChats(userId: number) {
    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoin('chat.users', 'currentUser')
      .leftJoinAndSelect('chat.users', 'user')
      .where('currentUser.id = :userId', { userId })
      .getMany();

    const chatsWithMessage = await Promise.all(
      chats.map(async (item) => {
        const message = await this.messagesRepository.findOne({
          where: {
            chat: item.id,
          },
          order: {
            id: 'DESC',
          },
          relations: ['from'],
        });

        return {
          ...item,
          lastMessage: message,
        };
      }),
    );

    return chatsWithMessage;
  }
}
