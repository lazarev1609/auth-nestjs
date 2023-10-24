import { StringProperty } from '@ivankrtv/openapidoc/dist';

export class LoginResponseDto {
  @StringProperty({
    description: 'accessToken пользователя',
    example: '6584edca-95ab-4620-a8d5-3228e364f293',
  })
  accessToken: string;

  @StringProperty({
    description: 'refreshToken пользователя',
    example: '1f21cf95-cdc8-4cbd-9aa3-e22dd95b57df3',
  })
  refreshToken: string;
}
