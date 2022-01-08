import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  AfterUpdate,
  OneToOne,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from '../../auth/entities';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: 'Chat' })
  name: string;

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable({
    joinColumn: {
      referencedColumnName: 'id',
    },
    name: 'user_chat',
  })
  users: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
