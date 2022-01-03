import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Call } from '../chat/entities';
import { GetCallsDto } from './dto/getCalls.dto';

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(Call) private callRepository: Repository<Call>,
  ) {}

  async getCalls(query: GetCallsDto): Promise<Call[]> {
    const calls = await this.callRepository
      .createQueryBuilder('call')
      .where('call.name like :name', { name: `%${query.name}%` })
      .where('call.status = :status', { status: query.status })
      .getMany();

    return calls;
  }
}
