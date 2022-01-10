import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { CallService } from './call.service';
import { ICall } from './interfaces';
import { GetCallsDto } from './dto/getCalls.dto';
import { CallsResponseExample } from '../docs';

@Controller('/api/calls')
@ApiBearerAuth()
export class CallController {
  constructor(private callService: CallService) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({
    description: 'Get calls',
    schema: {
      example: CallsResponseExample,
    },
  })
  getCalls(@Query() query: GetCallsDto): Promise<ICall[]> {
    return this.callService.getCalls(query);
  }
}
