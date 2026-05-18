import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // адреса твоего Nuxt
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('AniList API')
    .setDescription('Документация для аниме')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
    console.log(`📚 Документация Swagger: http://localhost:${port}/api-docs`);
  });
}
bootstrap();
