import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from '../../common/entities';

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

  @Column({ type: 'char', length: 255, select: true })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Auth, (auth) => auth.userId)
  auths: [];
}
