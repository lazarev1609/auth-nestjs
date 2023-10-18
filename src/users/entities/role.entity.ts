import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRolesEnum } from '../../enums/user-roles.enum';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: UserRolesEnum })
  type: UserRolesEnum;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
