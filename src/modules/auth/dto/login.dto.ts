import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'juanperez@mail.com', description: 'Correo electrónico del usuario' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
    @IsNotEmpty()
    password: string;
}
