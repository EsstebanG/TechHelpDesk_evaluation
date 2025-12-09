import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// ENUM.
import { UserRole } from '../../../common/enums/user-role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Entidad. / Entity.
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id_user: number;

    @Column({ length: 120 })
    full_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CLIENT,
    })
    role: UserRole;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
