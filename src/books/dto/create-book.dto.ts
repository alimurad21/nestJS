/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @Type(() => Date)
  publishedDate: Date;

  @IsString()
  description: string;
}

