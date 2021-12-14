import { Controller, Get, Param } from '@nestjs/common';

import { MessagesService } from './messages.service';

@Controller('/api/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('/:chatId')
  async getMessages(@Param('chatId') chatId: number) {
    return this.messagesService.getMessagesByChatId(chatId);
  }
}
