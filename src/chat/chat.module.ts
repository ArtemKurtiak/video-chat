import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../auth/entities';
import { ChatGateway } from './chat.gateway';
import { Message } from './entities';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message, Chat])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
