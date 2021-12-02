import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';

import { Auth } from './entities';
import { IAuth } from './interfaces';
import { constants } from '../common/constants';

@Injectable()
export class JwtService {
  constructor(private authRepository: Repository<Auth>) {}
}
