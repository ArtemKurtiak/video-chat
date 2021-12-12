import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../auth/entities';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  to: number;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  from: number;
}
