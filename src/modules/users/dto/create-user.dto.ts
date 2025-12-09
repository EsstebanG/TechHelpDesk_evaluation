import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator'; // <- Librería class-validator. / class-validator library.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// ENUM.
import { UserRole } from '../../../common/enums/user-role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// DTO.
export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'You need to enter a real name...' })
    full_name: string;

    @IsEmail({}, { message: 'Please enter a valid email address...' })
    email: string;

    @IsString()
    @MinLength(5, { message: 'The password must be at least 5 characters long...' })
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole; // si no entra un rol, será CLIENT por defecto. / If no role is entered, CLIENT will be the default.
}
