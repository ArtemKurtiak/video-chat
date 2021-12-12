import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { IAnswerUser, ICallUser, IMessageUser } from './interfaces';
import { Message } from './entities/message.entity';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async handleConnection(socket: Socket): Promise<void> {
    const users = await this.userRepository.find({});

    socket.emit('users', users);
  }

  @SubscribeMessage('call')
  async callUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: ICallUser,
  ) {
    const { userId, signal, name, phone } = data;

    this.server.to(userId).emit('call', { name, signal, phone });
  }

  @SubscribeMessage('answer')
  async answerUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: IAnswerUser,
  ) {
    const { userId, signal } = data;

    this.server.to(userId).emit('answer', { signal });
  }

  @SubscribeMessage('message')
  async sendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: IMessageUser,
  ) {
    const { to, message, from } = data;

    await this.messageRepository.create({ to, from });

    this.server.to(to).broadcast.emit('message', { message, from });
  }
}
