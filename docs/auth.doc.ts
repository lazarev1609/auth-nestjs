import { authTag, commonController } from './openapi';
import { LoginRequestDto } from '../src/auth/dto/requests/login-request.dto';
import { LoginResponseDto } from '../src/auth/dto/responses/login-response.dto';
import { DomainErrorDto } from './errors/domain-error.dto';
import { ValidationErrorDto } from './errors/validation-error.dto';
import { NotFoundErrorDto } from './errors/not-found-error.dto';
import { ChangePasswordRequestDto } from '../src/auth/dto/requests/change-password-request.dto';
import { RegistrationRequestDto } from '../src/auth/dto/requests/registration-request.dto';
import { RefreshRequestDto } from '../src/auth/dto/requests/refresh-request.dto';
import { RefreshResponseDto } from '../src/auth/dto/responses/refresh-response.dto';

const authController = commonController.createController('/auth', [authTag]);

authController.addApiMethod('/login', {
  method: 'POST',
  title: 'Авторизация',
  isImplemented: false,
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
  isImplemented: false,
  requiresAuthorization: false,
  responses: {
    '200': [],
  },
});

authController.addApiMethod('/password/change', {
  method: 'PUT',
  title: 'Смена пароля',
  isImplemented: false,
  requiresAuthorization: true,
  requestBody: ChangePasswordRequestDto,
  responses: {
    '200': [],
    '400': [DomainErrorDto, ValidationErrorDto],
  },
});

authController.addApiMethod('/registration', {
  method: 'POST',
  title: 'Регистрация с помощью Email',
  isImplemented: false,
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
  isImplemented: false,
  requiresAuthorization: true,
  requestBody: RefreshRequestDto,
  responses: {
    '200': [RefreshResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
  },
});

// todo: за что отвечает
authController.addApiMethod('/token/verify', {
  method: 'POST',
  title: 'Проверка валидности токена',
  isImplemented: false,
  requiresAuthorization: true,
  // requestBody: VerifyRequestDto,
  responses: {
    // '200': [VerifyResponseDto],
    '200': [],
    '400': [DomainErrorDto, ValidationErrorDto],
  },
});
