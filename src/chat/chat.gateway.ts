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
import { Message } from './entities';
import { ChatService } from './chat.service';
import { RedisService } from '../common/services';

@WebSocketGateway({ path: '/messages' })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private chatService: ChatService,
    private redisService: RedisService,
  ) {}

  async handleConnection(socket: Socket): Promise<void> {
    const {
      handshake: {
        auth: { userId },
      },
      id,
    } = socket;

    await this.redisService.updateUserSocketId(userId, id);

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
    @MessageBody() dto: IMessageUser,
  ) {
    const { to, message, from } = dto;

    const { socketId } = await this.redisService.getUserDataByUserId(to);

    await this.chatService.sendMessage(dto);

    const senderUser = await this.userRepository.findOne({
      where: {
        id: from,
      },
    });

    this.server
      .to(socketId)
      .broadcast.emit('message', { message, from: senderUser });
  }
}
