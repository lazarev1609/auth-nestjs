import { commonController, userTag } from './openapi';
import { DomainErrorDto } from './errors/domain-error.dto';
import { ValidationErrorDto } from './errors/validation-error.dto';
import { UnauthorizedErrorDto } from './errors/unauthorized-error.dto';
import { UserResponseDto } from '../src/services/users/dto/responses/user-response.dto';
import { UserHistoryListResponseDto } from '../src/services/users/dto/responses/user-history-list-response.dto';

const userController = commonController.createController('user', [userTag]);

userController.addApiMethod('', {
  method: 'GET',
  title: 'Получение данные пользователя',
  isImplemented: false,
  requiresAuthorization: true,
  responses: {
    '200': [UserResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
  },
});

userController.addApiMethod('/history', {
  method: 'GET',
  title: 'Получение истории авторизаций пользователя',
  isImplemented: false,
  requiresAuthorization: true,
  responses: {
    '200': [UserHistoryListResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
  },
});
