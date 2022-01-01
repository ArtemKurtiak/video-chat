import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';
import { LoginDto, RegisterDto } from './dto';
import { IUser } from './interfaces';
import { JwtService, PasswordService } from '../common/services';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async login(
    dto: LoginDto,
    user: IUser,
  ): Promise<(IUser & IToken) | BadRequestException> {
    console.log(dto);
    const { password } = dto;

    await this.passwordService.comparePasswords(password, user.password.trim());

    const token: IToken = await this.jwtService.generateToken(user.id);

    return { ...user, ...token, password: null };
  }

  async register(dto: RegisterDto): Promise<IUser & IToken> {
    console.log(dto);
    const { password } = dto;

    const hashedPassword: string = await this.passwordService.hashPassword(
      password,
    );

    const data: IUser = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const user: IUser = await this.userRepository.save(data);

    const token: IToken = await this.jwtService.generateToken(user.id);

    return { ...user, ...token, password: null };
  }
}
