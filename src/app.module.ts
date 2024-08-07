/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AppController } from './app.controller';

console.log("process.env.MONGODB_URL",process.env.MONGODB_URL)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make environment variables available globally
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL), // Use environment variable for MongoDB URL
    BooksModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
