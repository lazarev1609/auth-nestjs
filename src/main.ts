import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { openApiDocument } from '../docs/openapi';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api/docs', app, openApiDocument as OpenAPIObject);

  await app.listen(3000);
}
bootstrap();
