import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CheckAuthToken } from '../users/middlewares';
import { CommonModule } from '../common/common.module';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { Call } from '../chat/entities';
import { Auth } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Call, Auth]), CommonModule],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckAuthToken).forRoutes('/api/users');
  }
}
