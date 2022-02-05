import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendgridController } from './sendgird/sendgrid.controller';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SendGridModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('SEND_GRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, SendgridController],
  providers: [AppService],
})
export class AppModule {}
