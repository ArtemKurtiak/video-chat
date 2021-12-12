import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from '../chat/entities';
import { IMessage } from './interfaces';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
  ) {}

  async getMessages(): Promise<IMessage[]> {
    const messages = await this.messagesRepository.find({
      relations: ['from', 'to'],
    });

    return messages;
  }
}
