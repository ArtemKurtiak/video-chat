import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Auth } from './auth.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({
    type: 'varchar',
  })
  @Field()
  firstName: string;

  @Column({
    type: 'varchar',
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
  })
  @Field()
  password: string;
}
