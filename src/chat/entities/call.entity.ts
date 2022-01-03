import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../auth/entities';
import { CallStatusesEnum } from '../enums';

@Entity()
export class Call {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  start: string;

  @Column({ type: 'date' })
  end: string;

  @Column({ type: 'enum', enum: CallStatusesEnum })
  status: CallStatusesEnum;

  @ManyToOne(() => User)
  startUser: number;

  @ManyToOne(() => User)
  toUser: number;
}
