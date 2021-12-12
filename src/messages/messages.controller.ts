import { Controller, Get } from '@nestjs/common';

import { MessagesService } from './messages.service';

@Controller('/api/messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('/')
  async getMessages() {
    return this.messagesService.getMessages();
  }
}
