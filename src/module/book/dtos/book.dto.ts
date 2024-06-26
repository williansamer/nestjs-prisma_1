import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BookDto{

    @IsString({message: 'Id field need to be a string'})
    @IsOptional()
    id?: string;

    @IsNotEmpty({message: 'Title field is empty. You have to put a valid title'})
    @IsString({message: 'Title field need to be a string'})
    title: string;

    @IsString({message: 'Description field need to be a string'})
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsNotEmpty({message: 'Bar Code field is empty. Bar Code is necessary'})
    bar_code: string;
}