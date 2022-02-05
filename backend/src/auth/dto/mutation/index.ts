import { Field, ObjectType } from '@nestjs/graphql';

import { UserOT } from '../../../chat/dto/query/user';

@ObjectType()
export class AuthUser extends UserOT {
  @Field()
  id: number;

  @Field()
  token: string;
}
