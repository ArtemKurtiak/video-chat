import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ChatService } from './chat.service';
import { User } from '../auth/entities';
import { CheckAuthTokenGuard } from './guards';
import { GetChatsArgs, GetMessagesArgs } from './dto/args';
import { ChatWithLastMessage } from './dto/query';
import { MessageOT } from './dto/query/message';

@Resolver(() => User)
@UseGuards(CheckAuthTokenGuard)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Query(() => [ChatWithLastMessage])
  async getChats(@Args() args: GetChatsArgs) {
    return this.chatService.getChats(args);
  }

  @Query(() => [MessageOT])
  async getMessages(@Args() args: GetMessagesArgs) {
    return this.chatService.getMessagesByChat(args.chatId);
  }
}
