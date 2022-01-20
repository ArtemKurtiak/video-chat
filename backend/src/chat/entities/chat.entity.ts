import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../auth/entities';

@Entity()
@ObjectType()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar' })
  @Field()
  title: string;

  @Column({ type: 'varchar' })
  @Field()
  description: string;

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({
    joinColumn: {
      referencedColumnName: 'id',
    },
    name: 'user_chat',
  })
  users: User[];
}
