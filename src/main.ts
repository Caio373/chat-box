import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Ponto de entrada da aplicação.
 *
 * Decisão arquitetural:
 * - Centralizamos bootstrap, validação global e documentação OpenAPI em um único arquivo
 *   para manter baixa complexidade de infraestrutura e facilitar expansão futura.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mini Chat API')
    .setDescription('API HTTP e WebSocket para um mini chat com Clean Architecture')
    .setVersion('1.0.0')
    .addTag('users')
    .addTag('rooms')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(3000);
}

void bootstrap();
