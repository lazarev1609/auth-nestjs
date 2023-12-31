import { authTag, commonController } from './openapi';
import { LoginRequestDto } from '../src/services/auth/dto/requests/login-request.dto';
import { LoginResponseDto } from '../src/services/auth/dto/responses/login-response.dto';
import { DomainErrorDto } from './errors/domain-error.dto';
import { ValidationErrorDto } from './errors/validation-error.dto';
import { NotFoundErrorDto } from './errors/not-found-error.dto';
import { ChangePasswordRequestDto } from '../src/services/auth/dto/requests/change-password-request.dto';
import { RegistrationRequestDto } from '../src/services/auth/dto/requests/registration-request.dto';
import { RefreshRequestDto } from '../src/services/auth/dto/requests/refresh-request.dto';
import { RefreshResponseDto } from '../src/services/auth/dto/responses/refresh-response.dto';
import { UnauthorizedErrorDto } from './errors/unauthorized-error.dto';
import { VerifyRequestDto } from '../src/services/auth/dto/requests/VerifyRequest.dto';
import { VerifyResponseDto } from '../src/services/auth/dto/responses/verify-response.dto';

const authController = commonController.createController('/auth', [authTag]);

authController.addApiMethod('/login', {
  method: 'POST',
  title: 'Авторизация',
  isImplemented: true,
  requiresAuthorization: false,
  requestBody: LoginRequestDto,
  responses: {
    '200': [LoginResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '404': [NotFoundErrorDto],
  },
});

authController.addApiMethod('/logout', {
  method: 'POST',
  title: 'Выход из системы',
  isImplemented: true,
  requiresAuthorization: false,
  responses: {
    '200': [],
  },
});

authController.addApiMethod('/password/change', {
  method: 'PUT',
  title: 'Смена пароля',
  isImplemented: true,
  requiresAuthorization: true,
  requestBody: ChangePasswordRequestDto,
  responses: {
    '200': [],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
  },
});

authController.addApiMethod('/register', {
  method: 'POST',
  title: 'Регистрация с помощью Email',
  isImplemented: true,
  requiresAuthorization: false,
  requestBody: RegistrationRequestDto,
  responses: {
    '200': [],
    '400': [DomainErrorDto, ValidationErrorDto],
  },
});

authController.addApiMethod('/token/refresh', {
  method: 'POST',
  title: 'Обновление токенов',
  isImplemented: true,
  requiresAuthorization: true,
  requestBody: RefreshRequestDto,
  responses: {
    '200': [RefreshResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
  },
});

authController.addApiMethod('/token/verify', {
  method: 'POST',
  title: 'Проверка валидности токена',
  isImplemented: false,
  requiresAuthorization: true,
  requestBody: VerifyRequestDto,
  responses: {
    '200': [VerifyResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
  },
});
