import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../auth/entities';
import { ChatGateway } from './chat.gateway';
import { Message } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [ChatGateway],
})
export class ChatModule {}
