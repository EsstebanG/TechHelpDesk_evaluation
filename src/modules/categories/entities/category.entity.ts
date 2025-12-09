import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidades. / Entitys.

// Entidad 'Ticket'. / 'Ticket' entity.
import { Ticket } from '../../tickets/entities/ticket.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidad. / Entity.
@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('increment')
    id_category: number;

    @Column({ length: 100, unique: true })
    name: string; // REQUEST, HARDWARE INCIDENT, SOFTWARE INCIDENT

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @OneToMany(() => Ticket, (ticket) => ticket.category)
    tickets: Ticket[];
}
