import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { IUser } from '../auth/interfaces';
import { RedisService } from '../common/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private redisService: RedisService,
  ) {}

  async getUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find({});

    return users;
  }

  async getUserDetails(id: number): Promise<IUser | null> {
    const { socketId } = await this.redisService.getUserDataByUserId(id);

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return { ...user, socketId };
  }

  async getMe(userId: number): Promise<IUser | null> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
