import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { User } from './entities';
import { AuthType, UserType } from './types';
import { Auth } from './entities';
import { LoginArgs } from './dto/args';
import { RegisterInput } from './dto/input';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    @Inject('SEND_GRID') private sendGridClient: ClientProxy,
    private configService: ConfigService,
  ) {}

  private async _generateToken(userId: number): Promise<AuthType> {
    const token = sign({}, this.configService.get('JWT_SECRET'), {
      expiresIn: this.configService.get('JWT_EXPIRE'),
    });

    const auth = this.authRepository.create({
      token,
      user: userId,
    });

    await this.authRepository.save(auth);

    return auth;
  }

  private async _hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async _comparePasswords(password: string, hash: string) {
    const matched = await bcrypt.compare(password, hash);

    if (!matched) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async registerUser(dto: RegisterInput): Promise<UserType & AuthType> {
    const { email } = dto;

    const userExists = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await this._hashPassword(dto.password);

    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const { id } = await this.userRepository.save(user);

    const auth = await this._generateToken(id);

    this.sendGridClient.emit('send-email', {
      email,
      template: 'd-df3ec4816e114159a317002c2229cd95',
    });

    return {
      ...auth,
      ...user,
    };
  }

  async loginUser(args: LoginArgs): Promise<UserType & AuthType> {
    const { email, password } = args;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password', 'age', 'firstName', 'lastName'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this._comparePasswords(password, user.password);

    const token: AuthType = await this._generateToken(user.id);

    return {
      ...token,
      ...user,
      password: null,
    };
  }
}
