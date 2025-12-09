import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidades. / Entities.

// Entidad 'User'. / 'User' entity.
import { User } from '../../users/entities/user.entity';

// Entidad 'Ticket'. / 'Ticket' entity.
import { Ticket } from '../../tickets/entities/ticket.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidad base. / Base entity.
import { BaseEntity } from '../../../shared/base.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@Entity('clients')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id_client: number;

    @Column({ length: 120 })
    full_name: string;

    @Column({ length: 150 })
    company: string;

    @Column({ length: 150, unique: true })
    contact_email: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @OneToMany(() => Ticket, (ticket) => ticket.client)
    tickets: Ticket[];
}
