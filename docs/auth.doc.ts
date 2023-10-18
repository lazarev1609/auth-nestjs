import { authTag, commonController } from './openapi';
import { LoginRequestDto } from '../src/auth/dto/requests/login-request.dto';
import { LoginResponseDto } from '../src/auth/dto/responses/login-response.dto';

const authController = commonController.createController('/auth', [authTag]);

authController.addApiMethod('/login', {
  method: 'POST',
  title: 'Создание сессии',
  description: `Пользователь авторизован, записывает токен в cookie`,
  isImplemented: false,
  requiresAuthorization: false,
  requestBody: LoginRequestDto,
  responses: {
    '200': [LoginResponseDto],
    '400': [],
  },
});
