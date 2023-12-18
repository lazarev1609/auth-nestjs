import { StringProperty } from '@ivankrtv/openapidoc/dist';

export class VerifyRequestDto {
  @StringProperty({
    description: 'accessToken пользователя',
    example: '1f21cf95-cdc8-4cbd-9aa3-e22dd95b57df3',
  })
  accessToken: string;
}
