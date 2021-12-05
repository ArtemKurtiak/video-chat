import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { IUser } from '../auth/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find({});

    return users;
  }

  async getUserDetails(id: number): Promise<IUser | null> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}
