import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtService, PasswordService, RedisService } from './services';
import { Auth } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [JwtService, PasswordService, RedisService],
  exports: [JwtService, PasswordService, RedisService],
})
export class CommonModule {}
