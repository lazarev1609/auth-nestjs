import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserRolesEnum } from '../../enums/user-roles.enum';

@Injectable()
export class UserManager {
  create(email: string, password: string): UserEntity {
    const userToCreate = new UserEntity();
    userToCreate.email = email;
    userToCreate.password = password;
    userToCreate.createdAt = new Date();
    userToCreate.role = UserRolesEnum.user;

    return userToCreate;
  }
}
