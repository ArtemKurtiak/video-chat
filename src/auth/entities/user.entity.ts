import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from '../../common/entities';
import { Notification } from './notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 255, select: true })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar' })
  telephone: string;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @OneToMany(() => Auth, (auth) => auth.userId)
  auths: [];

  @OneToMany(() => Notification, (notification) => notification.userId)
  notifications: [];
}
