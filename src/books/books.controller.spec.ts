/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBook = (title = 'Test Book', author = 'Test Author'): Book => ({
    title,
    author,
    publishedDate: new Date(),
    description: 'Test Description',
    _id: '1',  // Add an example ID
  } as Book);

  const booksArray = [
    mockBook(),
    mockBook('Another Test Book', 'Another Test Author'),
  ];

  const mockCreateBookDto: CreateBookDto = {
    title: 'Test Book',
    author: 'Test Author',
    publishedDate: new Date(),
    description: 'Test Description',
  };

  const mockUpdateBookDto: UpdateBookDto = {
    title: 'Updated Book',
    author: 'Updated Author',
    publishedDate: new Date(),
    description: 'Updated Description',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(booksArray),
            findOne: jest.fn().mockResolvedValue(mockBook()),
            create: jest.fn().mockResolvedValue(mockBook()),
            update: jest.fn().mockResolvedValue(mockBook('Updated Book', 'Updated Author')),
            delete: jest.fn().mockResolvedValue(mockBook('Deleted Book', 'Deleted Author')),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of books', async () => {
    const result = booksArray;
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should return a single book', async () => {
    const result = mockBook();
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
  });

  it('should create a new book', async () => {
    const result = mockBook();
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(mockCreateBookDto)).toBe(result);
  });

  it('should update a book', async () => {
    const result = mockBook('Updated Book', 'Updated Author');
    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', mockUpdateBookDto)).toBe(result);
  });

  it('should delete a book', async () => {
    const result = mockBook('Deleted Book', 'Deleted Author');
    jest.spyOn(service, 'delete').mockResolvedValue(result);

    expect(await controller.delete('1')).toBe(result);
  });
});
