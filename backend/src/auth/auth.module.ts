import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './entities';
import { Auth } from './entities';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  controllers: [],
  imports: [TypeOrmModule.forFeature([User, Auth]), ConfigModule],
})
export class AuthModule {}
