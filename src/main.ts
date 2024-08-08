/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Use global pipes with transformation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 5000;
  
  try {
    await app.listen(port);
    console.log(`Nest application successfully started on port ${port}`);
  } catch (error) {
    console.error(`Failed to start Nest application on port ${port}`, error);
    process.exit(1);
  }
}

bootstrap();
