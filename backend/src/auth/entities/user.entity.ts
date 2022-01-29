import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Chat } from '../../chat/entities';

@Entity()
@InputType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    type: 'varchar',
    unique: false,
  })
  @Field()
  firstName: string;

  @Column({
    type: 'varchar',
    unique: false,
  })
  @Field()
  lastName: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  @Field(() => Int)
  age: number;

  @Column({
    type: 'varchar',
  })
  @Field()
  email: string;

  @Column({
    type: 'varchar',
    select: false,
  })
  @Field()
  password: string;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable({
    joinColumn: {
      referencedColumnName: 'id',
    },
    name: 'user_chat',
  })
  chats: Chat[];
}
