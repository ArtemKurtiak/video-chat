import { Body, Controller, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { IRequest } from './interfaces/request.interface';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async loginHandler(@Body() dto: LoginDto, @Req() req: IRequest) {
    console.log(dto, req.user);
    return this.authService.login(dto, req.user);
  }

  @Post('/register')
  async registerHandler(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }
}
