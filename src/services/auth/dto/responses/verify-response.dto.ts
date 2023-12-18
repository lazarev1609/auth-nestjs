import {
  EnumProperty,
  ObjectProperty,
  StringProperty,
} from '@ivankrtv/openapidoc/dist';
import { UserRolesEnum } from '../../../../enums/user-roles.enum';

export class VerifyResponseUserDto {
  @StringProperty({
    description: 'Id пользователя',
    example: '1f21cf95-cdc8-4cbd-9aa3-e22dd95b57df3',
  })
  userId: string;

  @EnumProperty({ description: 'Роль пользователя', enum: UserRolesEnum })
  role: UserRolesEnum;
}

export class VerifyResponseDto {
  @ObjectProperty({ description: 'User' })
  user: VerifyResponseUserDto;
}
