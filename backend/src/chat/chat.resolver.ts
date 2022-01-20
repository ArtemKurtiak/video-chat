import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Chat } from './entities';
import { ChatService } from './chat.service';
import { User } from '../auth/entities';
import { CheckAuthTokenGuard } from './guards';
import { GetChatsArgs } from './dto/args';

@Resolver(() => User)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Query(() => [Chat])
  @UseGuards(CheckAuthTokenGuard)
  async getChats(@Args() args: GetChatsArgs) {
    return this.chatService.getChats(args);
  }
}
