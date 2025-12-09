import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Entidades. / entities.
import { Client } from './entities/client.entity';

import { User } from '../users/entities/user.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// ENUM.
import { UserRole } from '../../common/enums/user-role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    // Servicio para crear cliente. / Service for creating clients.
    async create(dto: CreateClientDto) {

        // Verificar si el usuario existe. / Verify if the user exists.
        const user = await this.userRepo.findOne({
            where: { id_user: dto.id_user },
        });

        if (!user) {
            throw new NotFoundException(
                `User with ID ${dto.id_user} not found for client creation...`,
            );
        }

        // Verificar si su rol es CLIENT. / Verify that your role is CLIENT.
        if (user.role !== UserRole.CLIENT) {
            throw new BadRequestException(
                'The associated user must have CLIENT role...',
            );
        }

        // Verificar que no exista ya un client asociado a ese user. / Verify that there is no client already associated with that user.
        const existingClient = await this.clientRepo.findOne({
            where: { user: { id_user: dto.id_user } },
                relations: ['user'],
            });

            if (existingClient) {
                throw new BadRequestException(
                    `This user already has an associated client profile (ID: ${existingClient.id_client})...`,
                );
            }

        const newClient = this.clientRepo.create({
            full_name: dto.full_name,
            company: dto.company,
            contact_email: dto.contact_email,
            user: user,
        });

        return await this.clientRepo.save(newClient);
    }

    // Servicio para listar todos los clientes. / Service to list all clients.
    findAll() {
        return this.clientRepo.find({
            relations: ['user'],
            select: {
                id_client: true,
                full_name: true,
                company: true,
                contact_email: true,
                user: {
                    id_user: true,
                    full_name: true,
                    email: true,
                    role: true,
                },
            },
        });
    }

    // Servicio para buscar cliente por ID. / Service to search for clients by ID.
    async findOne(id_client: number) {
        const client = await this.clientRepo.findOne({
            where: { id_client },
            relations: ['user'],
        });

        if (!client) {
            throw new NotFoundException(`Client with ID ${id_client} not found...`);
        }

        return client;
    }

    // Servicio para actualizar cliente. / Service to update client.
    async update(id_client: number, dto: UpdateClientDto) {
        const client = await this.findOne(id_client);

        const { id_user, ...rest } = dto;

        Object.assign(client, rest);

        return await this.clientRepo.save(client);
    }

    // Servicio para eliminar cliente. / Service to delete client.
    async remove(id_client: number) {
        const client = await this.findOne(id_client);
        return await this.clientRepo.remove(client);
    }
}
