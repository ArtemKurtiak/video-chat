import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/me')
  getMe(@Req() { userId }: { userId: number }) {
    return this.usersService.getMe(userId);
  }

  @Get('/:userId')
  getUserDetails(@Param('userId') userId: number) {
    return this.usersService.getUserDetails(userId);
  }
}
