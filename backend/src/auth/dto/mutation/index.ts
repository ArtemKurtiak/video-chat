import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../entities';

@ObjectType()
export class AuthUser extends User {
  @Field()
  id: number;

  @Field()
  token: string;

  @Field()
  user: string;
}
