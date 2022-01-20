import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { Chat } from './entities';
import { Auth, User } from '../auth/entities';
import { CheckAuthTokenGuard } from './guards';

@Module({
  providers: [ChatResolver, ChatService, CheckAuthTokenGuard],
  imports: [TypeOrmModule.forFeature([Chat, User, Auth]), ConfigModule],
})
export class ChatModule {}
