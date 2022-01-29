import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TokenArgs {
  @Field()
  token: string;
}
