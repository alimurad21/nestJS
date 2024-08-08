/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';

const mockBook = (title = 'Test Book', author = 'Test Author') => ({
  title,
  author,
  publishedDate: new Date(),
  description: 'Test Description',
});

const booksArray = [
  mockBook(),
  mockBook('Another Test Book', 'Another Test Author'),
];

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook()),
            constructor: jest.fn().mockResolvedValue(mockBook()),
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksArray),
    } as any);
    const books = await service.findAll();
    expect(books).toEqual(booksArray);
  });

});
