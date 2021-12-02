import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { Auth, User } from './entities';
import { LoginDto, RegisterDto } from './dto';
import { IAuth, IUser } from './interfaces';
import { constants } from '../common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async generateToken(userId: number): Promise<IAuth> {
    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    const auth = this.authRepository.create({
      userId,
      token,
    });

    return this.authRepository.save(auth);
  }

  async login(data: LoginDto) {
    return 'Hello';
  }

  async register(dto: RegisterDto): Promise<IUser> {
    const userData = this.userRepository.create(dto);
    const user = await this.userRepository.save(userData);

    const token = await this.generateToken(user.id);

    return { ...user, ...token };
  }
}
