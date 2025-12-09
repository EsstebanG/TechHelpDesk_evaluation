import { IsEnum, IsInt, IsOptional, IsPositive, IsString, MinLength, } from 'class-validator';

import { TicketPriority } from '../../../common/enums/ticket-priority.enum';

export class CreateTicketDto {
    @IsString()
    @MinLength(3, { message: 'The ticket title must be at least 3 characters long...' })
    title: string;

    @IsString()
    @MinLength(5, { message: 'The ticket description must be at least 5 characters long...' })
    description: string;

    @IsEnum(TicketPriority, {
        message: 'Priority must be LOW, MEDIUM or HIGH...',
    })
    @IsOptional()
    priority?: TicketPriority; // Si no viene, será MEDIUM por defecto en la entidad. / If it does not come, it will be MEDIUM by default in the entity.

    // Cliente que reporta el ticket. / Client reporting the ticket.
    @IsInt({ message: 'The client ID must be an integer number...' })
    @IsPositive({ message: 'The client ID must be a positive number...' })
    id_client: number;

    // Categoría del ticket. / Ticket category.
    @IsInt({ message: 'The category ID must be an integer number...' })
    @IsPositive({ message: 'The category ID must be a positive number...' })
    id_category: number;

    // Técnico asignado (opcional al crear). / Assigned technician (optional on create).
    @IsInt({ message: 'The technician ID must be an integer number...' })
    @IsPositive({ message: 'The technician ID must be a positive number...' })
    @IsOptional()
    id_technician?: number;
}
