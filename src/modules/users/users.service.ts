import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Entidad. / Entity.
import { User } from './entities/user.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    // Servicio para crear usuario. / Service for creating users.
    async create(dto: CreateUserDto) {
        const exists = await this.userRepo.findOne({ where: { email: dto.email } });
        if (exists) {
            throw new BadRequestException('The email is already registered...');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newUser = this.userRepo.create({
            ...dto,
            password: hashedPassword,
        });

        return await this.userRepo.save(newUser);
    }

    // Servicio para listar todos los usuarios. / Service to list all users.
    findAll() {
        return this.userRepo.find({
            select: ['id_user', 'full_name', 'email', 'role', 'createdAt', 'updatedAt'],
        });
    }

    // Servicio para buscar usuario por ID. / Service to search for users by ID.
    async findOne(id_user: number) {
        const user = await this.userRepo.findOne({
            where: { id_user },
            select: ['id_user', 'full_name', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id_user} not found...`);
        }

        return user;
    }

    // Servicio para actualizar usuario. / Service to update user.
    async update(id_user: number, dto: UpdateUserDto) {
        const user = await this.findOne(id_user);

        Object.assign(user, dto);
        return await this.userRepo.save(user);
    }

    // Servicio para eliminar usuario. / Service to delete user.
    async remove(id_user: number) {
        const user = await this.findOne(id_user);
        return await this.userRepo.remove(user);
    }
}
