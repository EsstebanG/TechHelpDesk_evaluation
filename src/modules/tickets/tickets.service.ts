import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ticket } from './entities/ticket.entity';
import { Client } from '../clients/entities/client.entity';
import { Technician } from '../technicians/entities/technician.entity';
import { Category } from '../categories/entities/category.entity';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

import { TicketStatus } from '../../common/enums/ticket-status.enum';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepo: Repository<Ticket>,

        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,

        @InjectRepository(Technician)
        private readonly technicianRepo: Repository<Technician>,

        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) {}

    async create(dto: CreateTicketDto) {
        const client = await this.clientRepo.findOne({
            where: { id_client: dto.id_client },
        });
        if (!client) {
            throw new BadRequestException('Client not found for this ticket...');
        }

        const category = await this.categoryRepo.findOne({
            where: { id_category: dto.id_category },
        });
        if (!category) {
            throw new BadRequestException('Category not found for this ticket...');
        }

        let technician: Technician | null = null;

        if (dto.id_technician) {
            technician = await this.technicianRepo.findOne({
                where: { id_technician: dto.id_technician },
            });

            if (!technician) {
                throw new BadRequestException(
                'Technician not found for this ticket...',
                );
            }

            // Validar que no tenga más de 5 tickets IN_PROGRESS
            const inProgressCount = await this.ticketRepo.count({
                where: {
                    technician: { id_technician: technician.id_technician },
                    status: TicketStatus.IN_PROGRESS,
                },
            });

            if (inProgressCount >= 5) {
                throw new BadRequestException(
                    'This technician already has 5 tickets in progress...',
                );
            }
        }

        const ticket = this.ticketRepo.create({
            title: dto.title,
            description: dto.description,
            priority: dto.priority, // si no viene, la entidad usa default
            client,
            category,
            technician: technician ?? null,
        });

        return await this.ticketRepo.save(ticket);
    }

    findAll() {
        return this.ticketRepo.find({
            relations: ['client', 'technician', 'category'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id_ticket: number) {
        const ticket = await this.ticketRepo.findOne({
            where: { id_ticket },
            relations: ['client', 'technician', 'category'],
        });

        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${id_ticket} not found...`);
        }

        return ticket;
    }

    async update(id_ticket: number, dto: UpdateTicketDto) {
        const ticket = await this.findOne(id_ticket);

        // Si cambian el técnico, validamos la regla de 5 tickets IN_PROGRESS.
        if (dto.id_technician) {
            const technician = await this.technicianRepo.findOne({
                where: { id_technician: dto.id_technician },
            });

            if (!technician) {
                throw new BadRequestException(
                    'Technician not found for this ticket update...',
                );
            }

            const inProgressCount = await this.ticketRepo.count({
                where: {
                    technician: { id_technician: technician.id_technician },
                    status: TicketStatus.IN_PROGRESS,
                },
            });

            if (inProgressCount >= 5) {
                throw new BadRequestException(
                    'This technician already has 5 tickets in progress...',
                );
            }

            ticket.technician = technician;
        }

        const { id_client, id_category, id_technician, ...rest } = dto;

        Object.assign(ticket, rest);

        return await this.ticketRepo.save(ticket);
    }

    async updateStatus(id_ticket: number, dto: UpdateTicketStatusDto) {
        const ticket = await this.findOne(id_ticket);

        const currentStatus = ticket.status;
        const newStatus = dto.status;

        const flow: TicketStatus[] = [
          TicketStatus.OPEN,
          TicketStatus.IN_PROGRESS,
          TicketStatus.RESOLVED,
          TicketStatus.CLOSED,
        ];

        const currentIndex = flow.indexOf(currentStatus);
        const newIndex = flow.indexOf(newStatus);

        if (currentIndex === -1 || newIndex === -1) {
        throw new BadRequestException('Invalid ticket status...');
        }

        if (newIndex !== currentIndex + 1) {
            throw new BadRequestException(
                `Invalid status transition: ${currentStatus} -> ${newStatus}. Valid sequence is OPEN → IN_PROGRESS → RESOLVED → CLOSED.`,
            );
        }

        ticket.status = newStatus;
        return await this.ticketRepo.save(ticket);
    }

    async remove(id_ticket: number) {
        const ticket = await this.findOne(id_ticket);
        return await this.ticketRepo.remove(ticket);
    }

    async findByClient(id_client: number) {
        const client = await this.clientRepo.findOne({
            where: { id_client },
        });

        if (!client) {
            throw new NotFoundException(`Client with ID ${id_client} not found...`);
        }

        return this.ticketRepo.find({
            where: { client: { id_client } },
            relations: ['client', 'technician', 'category'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByTechnician(id_technician: number) {
        const technician = await this.technicianRepo.findOne({
            where: { id_technician },
        });

        if (!technician) {
            throw new NotFoundException(
                `Technician with ID ${id_technician} not found...`,
            );
        }

        return this.ticketRepo.find({
            where: { technician: { id_technician } },
            relations: ['client', 'technician', 'category'],
            order: { createdAt: 'DESC' },
        });
    }
}
