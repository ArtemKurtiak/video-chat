import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../auth/entities';
import { ChatGateway } from './chat.gateway';
import { Message } from './entities';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message, Chat]), CommonModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
