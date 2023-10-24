import { StringProperty } from '@ivankrtv/openapidoc/dist';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegistrationRequestDto {
  @StringProperty({ example: 'email@email.ru', description: 'почта' })
  @IsEmail()
  public email: string;

  @StringProperty({
    description: 'Пароль пользователя',
    example: 'password123',
    minLength: 6,
    maxLength: 32,
  })
  @IsString()
  @Length(6, 32)
  public password: string;

  @StringProperty({
    description: 'Подтвердите пароль',
    example: 'password123',
    minLength: 6,
    maxLength: 32,
  })
  @IsString()
  @Length(6, 32)
  public confirmedPassword: string;
}
