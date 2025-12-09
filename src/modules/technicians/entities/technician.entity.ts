import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidades. / Entitys.

// Entidad 'User'. / 'User' entity.
import { User } from '../../users/entities/user.entity';

// Entidad 'Ticket'. / 'Ticket' entity.
import { Ticket } from '../../tickets/entities/ticket.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@Entity('technicians')
export class Technician {
    @PrimaryGeneratedColumn('increment')
    id_technician: number;

    @Column({ length: 120 })
    full_name: string;

    @Column({ length: 150 })
    specialty: string;

    @Column({ length: 150 })
    availability: string; // ejemplo: "Mon-Fri 9-18"

    @OneToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @OneToMany(() => Ticket, (ticket) => ticket.technician)
    tickets: Ticket[];
}
