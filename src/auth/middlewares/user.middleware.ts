import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NextFunction, Response } from 'express';

import { User } from '../entities';

import { InjectRepository } from '@nestjs/typeorm';
import { IRequest } from '../interfaces/request.interface';

@Injectable()
export class CheckUserExistsByEmail implements NestMiddleware {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async use(req: IRequest, res: Response, next: NextFunction) {
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
