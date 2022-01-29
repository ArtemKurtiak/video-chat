import { ArgsType, Field } from '@nestjs/graphql';

import { User } from '../../../auth/entities';
import { TokenArgs } from '../../../common/dto/args';

@ArgsType()
export class GetChatsArgs extends TokenArgs {
  @Field(() => User, { nullable: true })
  user: User;
}
