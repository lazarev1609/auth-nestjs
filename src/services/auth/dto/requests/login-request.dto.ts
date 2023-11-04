import { StringProperty } from '@ivankrtv/openapidoc/dist';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginRequestDto {
  @StringProperty({
    description: 'Email пользователя',
    example: 'user@mail.ru',
  })
  @IsEmail()
  email: string;

  @StringProperty({
    description: 'Пароль пользователя',
    example: 'password123',
    minLength: 6,
    maxLength: 32,
  })
  @IsString()
  @Length(6, 32)
  password: string;
}
