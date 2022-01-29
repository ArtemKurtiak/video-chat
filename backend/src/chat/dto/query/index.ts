import { Field, ObjectType } from '@nestjs/graphql';

import { Chat } from '../../entities';
import { MessageOT } from './message';

@ObjectType()
export class ChatWithLastMessage extends Chat {
  @Field({ nullable: true })
  lastMessage: MessageOT;
}