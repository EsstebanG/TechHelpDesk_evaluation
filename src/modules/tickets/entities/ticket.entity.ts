import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// ENUMs.
import { TicketStatus } from '../../../common/enums/ticket-status.enum';
import { TicketPriority } from '../../../common/enums/ticket-priority.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidad base. / Base entity.
import { BaseEntity } from '../../../shared/base.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidades. / Entitys.

// Entidad 'Client'. / 'Client' entity.
import { Client } from '../../clients/entities/client.entity';

// Entidad 'Technician'. / 'Technician' entity.
import { Technician } from '../../technicians/entities/technician.entity';

// Entidad 'Category'. / 'Category' entity.
import { Category } from '../../categories/entities/category.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@Entity('tickets')
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id_ticket: number;

    @Column({ length: 150 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN,
    })
    status: TicketStatus;

    @Column({
        type: 'enum',
        enum: TicketPriority,
        default: TicketPriority.MEDIUM,
    })
    priority: TicketPriority;

    // Cliente que reporta el ticket. / Client reporting the ticket.
    @ManyToOne(() => Client, (client) => client.tickets, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    client: Client;

    // Técnico asignado (puede ser null al crear el ticket). / Assigned technician (may be null when creating the ticket).
    @ManyToOne(() => Technician, (technician) => technician.tickets, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    technician: Technician | null;

    @ManyToOne(() => Category, (category) => category.tickets, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    category: Category;
}
