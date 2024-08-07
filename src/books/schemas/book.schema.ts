/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  publishedDate: Date;

  @Prop()
  description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
