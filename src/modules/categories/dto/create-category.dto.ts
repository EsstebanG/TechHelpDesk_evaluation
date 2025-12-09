import { IsOptional, IsString, MinLength, IsNotEmpty } from 'class-validator';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export class CreateCategoryDto {
    @IsString()
    @MinLength(2, { message: 'You need to enter a valid category name...' })
    @IsNotEmpty({ message: 'The name category field cannot be empty...' })
    name: string; // e.g. "REQUEST", "HARDWARE INCIDENT", "SOFTWARE INCIDENT"

    @IsString()
    @IsOptional()
    description?: string | null;
}
