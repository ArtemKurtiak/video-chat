import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../auth/entities';
import { CommonModule } from '../common/common.module';
import { CheckAuthToken } from './middlewares';
import { Auth } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth]), CommonModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckAuthToken).forRoutes('/api/users');
  }
}
