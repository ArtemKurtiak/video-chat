import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async loginHandler(data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('/register')
  async registerHandler(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }
}
