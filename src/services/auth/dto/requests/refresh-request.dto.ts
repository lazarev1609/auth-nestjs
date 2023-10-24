import { StringProperty } from '@ivankrtv/openapidoc/dist';

export class RefreshRequestDto {
  @StringProperty({
    description: 'refreshToken пользователя',
    example: '1f21cf95-cdc8-4cbd-9aa3-e22dd95b57df3',
  })
  refreshToken: string;
}
