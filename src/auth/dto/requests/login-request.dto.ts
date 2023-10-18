import { StringProperty } from '@ivankrtv/openapidoc/dist';

export class LoginRequestDto {
  @StringProperty({
    description: 'Email пользователя',
    example: 'user@mail.ru',
  })
  email: string;

  @StringProperty({
    description: 'Пароль пользователя',
    example: 'password123',
    minLength: 6,
    maxLength: 8,
  })
  password: string;
}
