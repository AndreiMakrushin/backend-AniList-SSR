import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Включаем CORS (важно для запросов с фронта)
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // адреса твоего Nuxt
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 2. (Опционально) Добавляем глобальный префикс к API
  // app.setGlobalPrefix('api');

  // 3. Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('AniList API')
    .setDescription('Документация для аниме')
    .setVersion('1.0')
    .addBearerAuth() // если будешь использовать JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // путь к документации

  // 4. Порт из переменных окружения или по умолчанию 3001
  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
    console.log(`📚 Документация Swagger: http://localhost:${port}/api-docs`);
  });
}
bootstrap();
