import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('MESSAGING') private messagingClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  createHello() {
    this.messagingClient.emit('NEW_HELLO', {});

    return 'New hello world';
  }
}
