import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Auth, User } from './entities';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [AuthResolver, AuthService],
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([User, Auth]),
    ConfigModule,
    ClientsModule.register([
      {
        name: 'SEND_GRID',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
})
export class AuthModule {}
