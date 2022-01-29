import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOT {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  age: number;

  @Field()
  email: string;
}
