import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { User } from '../users/entities/user.entity';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const exists = await this.usersService.findByEmail(registerDto.email);
        if (exists) {
            throw new BadRequestException('The email is already registered...');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.usersService.create({
            full_name: registerDto.full_name,
            email: registerDto.email,
            password: hashedPassword,
            role: registerDto.role as any,
        } as any);

        const { password, ...result } = user;
        return result;
    }

    async validateUser(loginDTO: LoginDto): Promise<User> {
        const user = await this.usersService.findByEmail(loginDTO.email);

        if (!user) {
            throw new UnauthorizedException('Email o contraseña incorrectos');
        }

        const isMatch = await bcrypt.compare(loginDTO.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Email o contraseña incorrectos');
        }

        return user;
    }

    async login(user: User) {
        const payload = {
        sub: user.id_user,
        email: user.email,
        role: user.role,
        };

        const accessToken = this.jwtService.sign(payload);

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key',
            expiresIn: '7d',
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async refresh(refreshToken: string) {
        try {
            const decoded = this.jwtService.verify<{
                sub: number;
                email: string;
                role: string;
            }>(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key',
            });

            const user = await this.usersService.findByEmail(decoded.email);
            if (!user) {
                throw new UnauthorizedException('Usuario no encontrado');
            }

            const payload = {
                sub: user.id_user,
                email: user.email,
                role: user.role,
            };

            const newAccessToken = this.jwtService.sign(payload);

            return {
                access_token: newAccessToken,
            };
        } catch (err) {
            throw new UnauthorizedException('Refresh token inválido o expirado');
        }
    }
}
