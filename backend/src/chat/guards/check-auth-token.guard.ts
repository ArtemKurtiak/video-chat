import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { GetChatsArgs } from '../dto/args';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../../auth/entities';

export class CheckAuthTokenGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const ctx = GqlExecutionContext.create(context);

      const { token }: GetChatsArgs = ctx.getArgs();

      const authToken = await this.authRepository.findOne({
        where: {
          token: token,
        },
        relations: ['user'],
      });

      if (!authToken) {
        return false;
      }

      await verify(token, this.configService.get('JWT_SECRET'));

      ctx.getArgs().user = authToken.user;

      return true;
    } catch (e) {
      return true;
    }
  }
}
