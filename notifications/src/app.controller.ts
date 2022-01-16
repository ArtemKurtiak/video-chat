import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('TEST')
  handleTest() {
    console.log('HELLO world');
  }

  @MessagePattern({ cmd: 'GET_NOTIFICATIONS' })
  getNotifications() {
    return {
      message: 'empty',
    };
  }
}
