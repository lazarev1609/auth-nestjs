import {
  ArrayProperty,
  IntProperty,
  StringProperty,
} from '@ivankrtv/openapidoc/dist';

export class UserHistoryItemResponseDto {
  @StringProperty({
    description: 'Id сущности',
    example: '1f21cf95-cdc8-4cbd-9aa3-e22dd95b57df3',
  })
  id: string;

  @StringProperty({
    description: 'User agent',
    example: 'Use agent',
  })
  user_agent: string;

  @StringProperty({
    description: 'Ip address',
    example: '192.168.200.1',
  })
  ip_address: string;

  @StringProperty({
    description: 'Url входа',
    example: 'https://localhost:8080',
  })
  url: string;

  @StringProperty({
    description: 'Время входа',
    example: '2023-11-11',
  })
  timestamp: Date;
}

export class UserHistoryListResponseDto {
  @ArrayProperty({
    description: 'История входов',
    minItems: 0,
    items: UserHistoryItemResponseDto,
  })
  items: number[];

  @IntProperty({ description: 'Общее количество', example: 10 })
  totalCount: number;
}
