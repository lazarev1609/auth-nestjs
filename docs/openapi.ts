import { OpenApiDoc, OpenAPIDocConfig } from '@ivankrtv/openapidoc/dist';

export const openApiDoc = new OpenApiDoc({
  title: 'Сервис авторизации',
  version: '0.1.0',
} as OpenAPIDocConfig);

import('./auth.doc');

export const commonController = openApiDoc.createController('');
export const authTag = openApiDoc.createTag('Авторизация');

export const userTag = openApiDoc.createTag('Пользователи');

export const openApiDocument = openApiDoc.compileOpenApi();
