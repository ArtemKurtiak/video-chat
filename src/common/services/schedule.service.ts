import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RedisService } from './redis.service';
import { redisKeysEnum } from '../constants/redisKeys.enum';
import { Message } from '../../chat/entities';

@Injectable()
export class ScheduleService {
  constructor(
    private redisService: RedisService,
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async createMessages() {
    const messages = await this.redisService.returnAndReplaceData(
      redisKeysEnum.messages,
      [],
    );

    await this.messagesRepository
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values(messages)
      .execute();
  }
}
