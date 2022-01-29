import { UserOT } from './user';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageOT {
  @Field()
  id: number;

  @Field()
  content: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  from: UserOT;
}
