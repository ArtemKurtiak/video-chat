import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckUserExistsByEmail implements NestMiddleware {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async use(req, res, next) {
    const { email } = req.body;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    req.user = user;

    next();
  }
}
