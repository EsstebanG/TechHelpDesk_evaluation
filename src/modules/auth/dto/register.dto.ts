import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del usuario' })
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({ example: 'juanperez@mail.com', description: 'Correo electrónico del usuario' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: 'Contraseña del usuario (mínimo 6 caracteres)' })
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'admin', description: 'rol' })
    @IsString({message: 'el rol es un texto'})
    role: string
}
