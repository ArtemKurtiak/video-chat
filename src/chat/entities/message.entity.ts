import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  AfterInsert,
  getManager,
} from 'typeorm';

import { User } from '../../auth/entities';
import { Chat } from './chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  text: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  to: number;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  from: number;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ referencedColumnName: 'id' })
  chat: Chat;

  @CreateDateColumn()
  createdAt: Date;
}
