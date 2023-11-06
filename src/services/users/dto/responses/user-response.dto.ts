import { UserRolesEnum } from '../../../../enums/user-roles.enum';
import { EnumProperty, StringProperty } from '@ivankrtv/openapidoc/dist';

export class UserResponseDto {
  @StringProperty({
    description: 'Id пользователя',
    example: '1f21cf95-cdc8-4cbd-9aa3-e22dd95b57df3',
  })
  id: string;

  @StringProperty({
    description: 'Email пользователя',
    example: 'user@mail.ru',
  })
  email: string;

  @StringProperty({
    description: 'Дата и время регистрации',
    example: '2023-05-14T10:00:00',
  })
  createdAt: Date;

  @StringProperty({
    description: 'Дата и время обновления данных',
    example: '2023-05-14T10:00:00',
  })
  updatedAt: Date;

  @EnumProperty({ description: 'Роль пользователя', enum: UserRolesEnum })
  role: UserRolesEnum;

  @StringProperty({
    description: 'refreshToken пользователя',
    example: '1f21cf95-cdc8-4cbd-9aa3-e22dd95b57df3',
  })
  refreshToken: string;
}
