/* eslint-disable perfectionist/sort-imports */
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { join } from 'node:path';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';
import { isDevelopment } from './utils/check-env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const PORT: number = Number(process.env.PORT ?? 8000);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Serve uploaded files statically
  app.useStaticAssets(join(__dirname, '..', 'uploads_folder'), {
    prefix: '/api/uploads/',
  });

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(cookieParser());

  if (isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
void bootstrap();
