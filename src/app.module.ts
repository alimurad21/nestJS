/* eslint-disable prettier/prettier */


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';

console.log('process.env.MONGODB_URL', process.env.MONGODB_URL);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    BooksModule,
  ],
})
export class AppModule {}
