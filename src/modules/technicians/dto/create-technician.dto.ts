import { IsInt, IsPositive, IsString, MinLength, IsNotEmpty, } from 'class-validator';

export class CreateTechnicianDto {
    @IsString()
    @MinLength(2, { message: 'You need to enter a real name for the technician...' })
    @IsNotEmpty({ message: 'The full_name field cannot be empty...' })
    full_name: string;

    @IsString()
    @MinLength(2, { message: 'You need to enter a valid specialty...' })
    specialty: string;

    @IsString()
    @MinLength(2, { message: 'You need to enter a valid availability description...' })
    availability: string; // e.g. "Mon-Fri 9-18"

    // ID del usuario asociado (rol TECHNICIAN). / Associated user ID (TECHNICIAN role).
    @IsInt({ message: 'The user ID must be an integer number...' })
    @IsPositive({ message: 'The user ID must be a positive number...' })
    id_user: number;
}
