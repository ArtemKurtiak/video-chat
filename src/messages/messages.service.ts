import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from '../chat/entities';
import { Chat } from '../chat/entities/chat.entity';
import { User } from '../auth/entities';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getMessagesByChatId(chatId: number): Promise<any> {
    return this.chatRepository
      .createQueryBuilder('chat')
      .where('chat.id = :id', { id: chatId })
      .leftJoinAndSelect('chat.messages', 'message')
      .leftJoinAndSelect('message.to', 'messageTo')
      .leftJoinAndSelect('message.from', 'messageFrom')
      .leftJoinAndSelect('chat.users', 'users')
      .getOne();
  }

  async getChats(userId: number) {
    return this.chatRepository
      .createQueryBuilder('chat')
      .leftJoin('chat.users', 'currentUser')
      .where('currentUser.id = :userId', { userId })
      .leftJoinAndSelect('chat.users', 'user')
      .getMany();
  }
}
