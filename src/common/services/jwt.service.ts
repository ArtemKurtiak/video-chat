import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { IAuth } from '../interfaces';
import { Auth } from '../entities';
import { IToken } from '../../auth/interfaces/token.interface';

@Injectable()
export class JwtService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async generateToken(userId: number): Promise<IToken> {
    const token: string = sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    const auth: IAuth = this.authRepository.create({
      userId,
      token,
    });

    await this.authRepository.save(auth);

    return { token };
  }

  async verifyToken(token: string) {
    try {
      await verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
