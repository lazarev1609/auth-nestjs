import {
  ArrayProperty,
  IntProperty,
  StringProperty,
} from '@ivankrtv/openapidoc/dist';

export class ValidationErrorDto {
  @IntProperty({ description: 'Статус-код ошибки', example: 400 })
  statusCode: number;

  @ArrayProperty({ description: 'Массив с текстами ошибок', items: 'string' })
  message: string[];

  @StringProperty({
    description: 'Всегда будет Bad Request',
    example: 'Bad Request',
  })
  error: string;
}
