import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: 5432,
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: true,
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      }),
    }),
    ClientsModule.register([
      {
        name: 'MESSAGING',
        transport: Transport.TCP,
      },
      {
        name: 'NOTIFICATIONS',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
