/* eslint-disable prettier/prettier */
import { IsString, IsDate } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsDate()
  publishedDate: Date;

  @IsString()
  description: string;
}


