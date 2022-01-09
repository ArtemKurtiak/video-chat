import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { IRequest } from './interfaces/request.interface';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({
    status: 200,
    description: 'Success login',
    schema: {
      example: {
        id: 1,
        email: 'johndoe@gmail.com',
        password: null,
        token: 'Aez...',
      },
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid credentials',
  })
  async loginHandler(@Body() dto: LoginDto, @Req() req: IRequest) {
    return this.authService.login(dto, req.user);
  }

  @Post('/register')
  @ApiOkResponse({
    description: 'Success registration',
    schema: {
      example: {
        name: 'John',
        age: 20,
        email: 'johndoe@gmail.com',
        password: null,
        telephone: '+110000000000',
        gender: 'Male',
        id: 1,
        createdAt: '2022-01-09T22:36:33.478Z',
        token: 'Aez...',
      },
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid data',
  })
  @ApiConflictResponse({
    description: 'Email already exists',
  })
  async registerHandler(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }
}
