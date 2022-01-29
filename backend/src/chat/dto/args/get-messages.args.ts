import { ArgsType, Field } from '@nestjs/graphql';

import { TokenArgs } from '../../../common/dto/args';

@ArgsType()
export class GetMessagesArgs extends TokenArgs {
  @Field()
  chatId: number;
}
