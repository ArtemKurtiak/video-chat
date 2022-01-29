import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { GetChatsArgs } from './dto/args';
import { Message } from './entities';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getChats(dto: GetChatsArgs) {
    const user: User = await this.userRepository.findOne({
      where: {
        id: dto.user.id,
      },
      relations: ['chats'],
    });

    const chats = await Promise.all(
      user.chats.map(async (item) => {
        const lastMessage = await this.messageRepository.findOne({
          where: {
            chat: item.id,
          },
          order: {
            id: 'DESC',
          },
        });

        return { ...item, lastMessage };
      }),
    );

    return chats;
  }

  async getMessagesByChat(chatId: number) {
    const messages = await this.messageRepository.find({
      where: {
        chat: chatId,
      },
    });

    return messages;
  }
}
