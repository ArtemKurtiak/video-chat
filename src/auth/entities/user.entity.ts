import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from './auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 255 })
  name: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'char', length: 255 })
  email: string;

  @Column({ type: 'char', length: 255 })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Auth, (auth) => auth.userId)
  auths: [];
}
