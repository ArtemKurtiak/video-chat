import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtService, PasswordService, RedisService } from './services';
import { Auth } from './entities';
import { ScheduleService } from './services/schedule.service';
import { Message } from '../chat/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, Message])],
  providers: [JwtService, PasswordService, RedisService, ScheduleService],
  exports: [JwtService, PasswordService, RedisService],
})
export class CommonModule {}
