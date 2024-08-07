/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS
  console.log("configService.get<string>('FRONTEND_URL')",configService.get<string>('FRONTEND_URL'))
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'), // Use environment variable for CORS
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('PORT') || 5000); // Use environment variable for port
}
bootstrap();
