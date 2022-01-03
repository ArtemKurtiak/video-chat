import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CallStatusesEnum } from '../../chat/enums';

export class GetCallsDto {
  @IsString()
  @IsOptional()
  name = '';

  @IsEnum(CallStatusesEnum)
  @IsOptional()
  status: CallStatusesEnum = CallStatusesEnum.Scheduled;
}
