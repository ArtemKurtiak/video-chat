import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../auth/entities';
import { ChatGateway } from './chat.gateway';
import { Call, Message, Chat } from './entities';
import { ChatService } from './chat.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Message, Chat, Call]),
    CommonModule,
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
