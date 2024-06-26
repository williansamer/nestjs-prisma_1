import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookDto } from './dtos/book.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BookService {
    constructor( private prisma: PrismaService ) {}

    async getBooks() {
        let allBooks = await this.prisma.book.findMany();

        if (allBooks.length === 0) {
            throw new HttpException('Empty storage', HttpStatus.NOT_FOUND)
        }

        return allBooks;
    }

    async create(data: BookDto) {

        let bookExist = await this.prisma.book.findFirst({
            where: {
                bar_code: data.bar_code
            }
        })

        if (bookExist) {
            throw new HttpException('Book already exists!!!', HttpStatus.AMBIGUOUS)
        }

        let bookCreated = await this.prisma.book.create({
            data
        });

        return bookCreated;
    }

    async updateBook(bar_code: string, data: BookDto) {
        var getBook = await this.prisma.book.findUnique({
            where: {
                bar_code
            }
        })

        if (!getBook) {
            throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        } 

        return await this.prisma.book.update({
            where: {
                bar_code: bar_code
            },
            data,
        })
    }

    async deleteBook(bar_code: string) {
        var getBook = await this.prisma.book.findUnique({
            where: {
                bar_code
            }
        })

        if (!getBook) {
            throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        } 

        await this.prisma.book.delete({
            where: {
                bar_code: bar_code
            }
        })

        return {message: 'DELETED'}
    }
}
