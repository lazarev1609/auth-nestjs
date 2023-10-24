import { HttpException, HttpStatus } from '@nestjs/common';
import e from 'express';

export class DomainException extends HttpException {
  public message: string;

  public statusCode: number;

  constructor(message: string, type: string, additionalFields: object = null) {
    const error = {
      message,
      type,
      ...additionalFields,
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
    };
    super(error, HttpStatus.BAD_REQUEST);
  }
}
