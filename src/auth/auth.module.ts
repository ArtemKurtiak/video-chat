import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities';
import { CommonModule } from '../common/common.module';
import { CheckUserExistsByEmail } from './middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CheckUserExistsByEmail).forRoutes('/api/auth/login');
  }
}
