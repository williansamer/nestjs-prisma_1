import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dtos/book.dto';
import { Response } from 'express';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(@Res() response: Response): Promise<any> {
    let allBooks = await this.bookService.getBooks();

    return response.status(200).json(allBooks);
  }

  @Post()
  async create(@Body() data: BookDto): Promise<BookDto> {
    let result = await this.bookService.create(data);

    return result;
  }

  @Put(':bar_code')
  async updateBook(@Param('bar_code') bar_code: string, @Body() data: BookDto, @Res() response: Response): Promise<object> {
    let result = await this.bookService.updateBook(bar_code, data);

    return response.status(200).json(result)
  }

  @Delete(':bar_code')
  async deleteBook(@Param('bar_code') bar_code: string, response: Response) {
    let result = await this.bookService.deleteBook(bar_code)

    return result;
  }
}
