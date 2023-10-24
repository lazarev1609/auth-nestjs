import { IsEmail } from 'class-validator';
import { StringProperty } from '@ivankrtv/openapidoc/dist';

export class ChangePasswordRequestDto {
  @StringProperty({
    description: 'Старый Email пользователя',
    example: 'user@mail.ru',
  })
  @IsEmail()
  oldPassword: string;

  @StringProperty({
    description: 'Новый Email пользователя',
    example: 'user@mail.ru',
  })
  @IsEmail()
  newPassword: string;
}
