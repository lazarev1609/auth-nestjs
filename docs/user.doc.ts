import { commonController, userTag } from './openapi';
import { DomainErrorDto } from './errors/domain-error.dto';
import { ValidationErrorDto } from './errors/validation-error.dto';
import { UnauthorizedErrorDto } from './errors/unauthorized-error.dto';
import { UserResponseDto } from '../src/services/users/dto/responses/user-response.dto';
import { UserHistoryListResponseDto } from '../src/services/users/dto/responses/user-history-list-response.dto';
import { UserRoleResponseDto } from '../src/services/users/dto/responses/user-role-response.dto';
import { UserRoleUpdateRequestDto } from '../src/services/users/dto/requests/user-role-update-request.dto';
import { UserRoleDeleteRequestDto } from '../src/services/users/dto/requests/user-role-delete-request.dto';

const userController = commonController.createController('user', [userTag]);

userController.addApiMethod('/me', {
  method: 'GET',
  title: 'Получение данные пользователя',
  isImplemented: true,
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

userController.addApiMethod('/me/role', {
  method: 'GET',
  title: 'Получение роли пользователя',
  isImplemented: false,
  requiresAuthorization: true,
  responses: {
    '200': [UserRoleResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
  },
});

userController.addApiMethod('/me/role', {
  method: 'PUT',
  title: 'Обновление роли пользователя',
  isImplemented: false,
  requiresAuthorization: true,
  requestBody: UserRoleUpdateRequestDto,
  responses: {
    '200': [UserRoleResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
  },
});

userController.addApiMethod('/me/role', {
  method: 'DELETE',
  title: 'Удаление роли пользователя',
  isImplemented: false,
  requiresAuthorization: true,
  requestBody: UserRoleDeleteRequestDto,
  responses: {
    '200': [UserRoleResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
  },
});
