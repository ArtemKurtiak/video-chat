import { ArgsType, Field } from '@nestjs/graphql';

import { User } from '../../../auth/entities';

@ArgsType()
export class GetChatsArgs {
  @Field()
  token: string;

  @Field(() => User, { nullable: true })
  user: User;
}
