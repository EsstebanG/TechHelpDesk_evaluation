import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Technician } from './entities/technician.entity';
import { User } from '../users/entities/user.entity';

import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class TechniciansService {
    constructor(
        @InjectRepository(Technician)
        private readonly technicianRepo: Repository<Technician>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async create(dto: CreateTechnicianDto) {
        const user = await this.userRepo.findOne({
        where: { id_user: dto.id_user },
        });

        if (!user) {
            throw new NotFoundException(
                `User with ID ${dto.id_user} not found for technician creation...`,
            );
        }

        if (user.role !== UserRole.TECHNICIAN) {
            throw new BadRequestException(
                'The associated user must have TECHNICIAN role...',
            );
        }

        const existingTech = await this.technicianRepo.findOne({
            where: { user: { id_user: dto.id_user } },
            relations: ['user'],
        });

        if (existingTech) {
            throw new BadRequestException(
                `This user already has an associated technician profile (ID: ${existingTech.id_technician})...`,
            );
        }

        const newTech = this.technicianRepo.create({
            full_name: dto.full_name,
            specialty: dto.specialty,
            availability: dto.availability,
            user: user,
        });

        return await this.technicianRepo.save(newTech);
    }

    findAll() {
        return this.technicianRepo.find({
            relations: ['user'],
            select: {
                id_technician: true,
                full_name: true,
                specialty: true,
                availability: true,
                user: {
                    id_user: true,
                    full_name: true,
                    email: true,
                    role: true,
                },
            },
        });
    }

    async findOne(id_technician: number) {
        const tech = await this.technicianRepo.findOne({
            where: { id_technician },
            relations: ['user'],
        });

        if (!tech) {
            throw new NotFoundException(
                `Technician with ID ${id_technician} not found...`,
            );
        }

        return tech;
    }

    async update(id_technician: number, dto: UpdateTechnicianDto) {
        const tech = await this.findOne(id_technician);

        const { id_user, ...rest } = dto;

        Object.assign(tech, rest);

        return await this.technicianRepo.save(tech);
    }

    // Eliminar técnico.
    async remove(id_technician: number) {
        const tech = await this.findOne(id_technician);
        return await this.technicianRepo.remove(tech);
    }
}
