import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CallService } from './call.service';
import { ICall } from './interfaces';
import { GetCallsDto } from './dto/getCalls.dto';

@Controller('/api/calls')
export class CallController {
  constructor(private callService: CallService) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBearerAuth()
  getCalls(@Query() query: GetCallsDto): Promise<ICall[]> {
    return this.callService.getCalls(query);
  }
}
