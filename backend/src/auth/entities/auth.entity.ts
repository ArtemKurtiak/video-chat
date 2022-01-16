import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from './user.entity';

@Entity()
@ObjectType()
export class Auth {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    type: 'varchar',
  })
  @Field()
  token: string;

  @ManyToOne(() => User, (user) => user.id)
  @Field(() => Int)
  user: number;
}
