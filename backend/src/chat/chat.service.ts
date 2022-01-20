import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { GetChatsArgs } from './dto/args';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getChats(dto: GetChatsArgs) {
    const user: User = await this.userRepository.findOne({
      where: {
        id: dto.user.id,
      },
      relations: ['chats'],
    });

    return user.chats;
  }
}
