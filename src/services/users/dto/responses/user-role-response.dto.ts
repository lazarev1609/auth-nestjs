import { UserRolesEnum } from '../../../../enums/user-roles.enum';
import { EnumProperty } from '@ivankrtv/openapidoc/dist';

export class UserRoleResponseDto {
  @EnumProperty({ description: 'Роль пользователя', enum: UserRolesEnum })
  role: UserRolesEnum;
}
