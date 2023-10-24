import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRolesEnum } from '../../../enums/user-roles.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserRolesEnum,
    default: UserRolesEnum.user,
  })
  role: UserRolesEnum;

  @Column()
  refreshToken: string;
}
