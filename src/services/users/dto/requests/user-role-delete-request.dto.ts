import { EnumProperty } from '@ivankrtv/openapidoc/dist';
import { UserRolesEnum } from '../../../../enums/user-roles.enum';
import { IsEnum } from 'class-validator';

export class UserRoleDeleteRequestDto {
  @EnumProperty({ description: 'Роль пользователя', enum: UserRolesEnum })
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;
}
