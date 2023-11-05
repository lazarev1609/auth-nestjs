import { IsEmail, IsString } from 'class-validator';
import { StringProperty } from '@ivankrtv/openapidoc/dist';

export class ChangePasswordRequestDto {
  @StringProperty({
    description: 'Старый пароль пользователя',
    example: '12345678',
  })
  @IsString()
  oldPassword: string;

  @StringProperty({
    description: 'Новый пароль пользователя',
    example: '87654321',
  })
  @IsString()
  newPassword: string;
}
