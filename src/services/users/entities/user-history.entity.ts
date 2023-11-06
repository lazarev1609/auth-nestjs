import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_agent: string;

  @Column()
  ip_address: string;

  @Column()
  url: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
