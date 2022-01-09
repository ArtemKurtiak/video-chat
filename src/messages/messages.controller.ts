import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { MessagesService } from './messages.service';

@Controller('/api/chats')
@ApiBearerAuth()
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('/:chatId')
  async getMessages(@Param('chatId') chatId: number) {
    return this.messagesService.getMessagesByChatId(chatId);
  }

  @Get('/')
  getChats(@Req() { userId }) {
    return this.messagesService.getChats(userId);
  }
}
