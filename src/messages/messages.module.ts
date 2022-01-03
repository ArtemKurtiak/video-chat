import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { CheckAuthToken } from '../users/middlewares';
import { Auth } from '../common/entities';
import { CommonModule } from '../common/common.module';
import { Message } from '../chat/entities';
import { Chat } from '../chat/entities';
import { User } from '../auth/entities';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    TypeOrmModule.forFeature([Auth, Message, Chat, User]),
    CommonModule,
  ],
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckAuthToken).forRoutes('/api/chats');
  }
}
