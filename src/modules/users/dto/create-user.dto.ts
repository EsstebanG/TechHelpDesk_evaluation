import {  IsEmail, IsEnum, IsOptional, IsString, MinLength, IsNotEmpty, IsBoolean } from 'class-validator';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// ENUM.
import { UserRole } from '../../../common/enums/user-role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'You need to enter a real name...' })
    @IsNotEmpty({ message: 'The full_name field cannot be empty...' })
    full_name: string;

    @IsEmail({}, { message: 'Please enter a valid email address...' })
    email: string;

    @IsString()
    @MinLength(5, { message: 'The password must be at least 5 characters long...' })
    password: string;

    @IsEnum(UserRole, { message: 'Role must be admin, technician or client...' })
    @IsOptional()
    role?: UserRole;

    @IsBoolean({ message: 'isActive must be true or false...' })
    @IsOptional()
    isActive?: boolean;
}
