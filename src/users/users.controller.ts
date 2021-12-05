import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:userId')
  async getUserDetails(@Param('userId') userId: number) {
    return this.usersService.getUserDetails(userId);
  }
}
