import { Controller, Get, Param, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  MeResponseExample,
  UnAuthorizedResponseExample,
  UserByIdResponseExample,
  UsersResponseExample,
} from '../docs';

@Controller('/api/users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  schema: {
    example: UnAuthorizedResponseExample,
  },
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @ApiOkResponse({
    schema: {
      example: UsersResponseExample,
    },
    description: 'Get users',
  })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/me')
  @ApiOkResponse({
    schema: {
      example: MeResponseExample,
    },
    description: 'Get me',
  })
  getMe(@Req() { userId }: { userId: number }) {
    return this.usersService.getMe(userId);
  }

  @ApiOkResponse({
    schema: {
      example: UserByIdResponseExample,
    },
    description: 'Get user by id',
  })
  @Get('/:userId')
  getUserDetails(@Param('userId') userId: number) {
    return this.usersService.getUserDetails(userId);
  }
}
