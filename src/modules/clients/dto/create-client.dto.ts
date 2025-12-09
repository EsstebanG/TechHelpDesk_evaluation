import { IsEmail, IsInt, IsPositive, IsString, MinLength, IsNotEmpty } from 'class-validator'; // <- Librería class-validator. / class-validator library.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export class CreateClientDto {
    @IsString()
    @MinLength(2, { message: 'You need to enter a real name for the client...' })
    @IsNotEmpty({ message: 'The full_name field cannot be empty...' })
    full_name: string;

    @IsString()
    @MinLength(2, { message: 'You need to enter a valid company name...' })
    @IsNotEmpty({ message: 'The company field cannot be empty...' })
    company: string;

    @IsEmail({}, { message: 'Please enter a valid contact email address...' })
    contact_email: string;

    // ID del usuario asociado (rol CLIENT). / Associated user ID (CLIENT role).
    @IsInt({ message: 'The user ID must be an integer number...' })
    @IsPositive({ message: 'The user ID must be a positive number...' })
    id_user: number;
}
