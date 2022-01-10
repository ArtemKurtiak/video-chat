import { Controller, Get, Param, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { MessagesService } from './messages.service';
import {
  ChatByIdResponseExample,
  ChatsResponseExample,
  UnAuthorizedResponseExample,
} from '../docs';

@Controller('/api/chats')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  schema: {
    example: UnAuthorizedResponseExample,
  },
})
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('/:chatId')
  @ApiOkResponse({
    schema: {
      example: ChatByIdResponseExample,
    },
    description: 'Get messages by chat',
  })
  async getMessages(@Param('chatId') chatId: number) {
    return this.messagesService.getMessagesByChatId(chatId);
  }

  @ApiOkResponse({
    schema: {
      example: ChatsResponseExample,
    },
    description: 'Get chats',
  })
  @Get('/')
  getChats(@Req() { userId }) {
    return this.messagesService.getChats(userId);
  }
}
