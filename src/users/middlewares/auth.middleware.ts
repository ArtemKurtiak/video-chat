import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response, NextFunction } from 'express';

import { IRequest } from '../../auth/interfaces/request.interface';
import { Auth } from '../../common/entities';
import { JwtService } from '../../common/services';

@Injectable()
export class CheckAuthToken implements NestMiddleware {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async use(req: IRequest, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Jwt token not found');
    }

    await this.jwtService.verifyToken(token);

    const authToken = await this.authRepository.findOne({
      where: {
        token,
      },
    });

    if (!authToken) {
      throw new UnauthorizedException('Jwt token invalid');
    }

    req.userId = authToken.userId;

    next();
  }
}
