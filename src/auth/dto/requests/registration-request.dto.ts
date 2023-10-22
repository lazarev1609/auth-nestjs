import { StringProperty } from '@ivankrtv/openapidoc/dist';

export class RegistrationRequestDto {
  @StringProperty({ example: 'email@email.ru', description: 'почта' })
  email: string;
}
