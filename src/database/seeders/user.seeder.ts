import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../modules/users/entities/user.entity';
import { UserRole } from '../../common/enums/user-role.enum';

export async function userSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting user seed process...');

    const userRepository = dataSource.getRepository(User);

    const count = await userRepository.count();

    if (count === 0) {
        const users = [
            {
                full_name: 'Admin User',
                email: 'admin@techhelp.com',
                password: 'admin123',
                role: UserRole.ADMIN,
            },
            {
                full_name: 'Client User',
                email: 'client@techhelp.com',
                password: 'client123',
                role: UserRole.CLIENT,
            },
            {
                full_name: 'Technician User',
                email: 'tech@techhelp.com',
                password: 'tech123',
                role: UserRole.TECHNICIAN,
            },
            {
                full_name: 'Technician User 2',
                email: 'tech2@techhelp.com',
                password: 'tech12345',
                role: UserRole.TECHNICIAN,
            },
        ];

        for (let user of users) {
            user.password = await bcrypt.hash(user.password, 10);

            const existingUser = await userRepository.findOne({ where: { email: user.email } });
            if (existingUser) {
                console.log(`⚠️ User ${user.email} already exists, skipping...`);
                continue;
            }

            await userRepository.save(user);
            console.log(`✅ User ${user.email} created successfully!`);
        }
    } else {
        console.log('⚠️ Users already exist, seed omitted.');
    }

    console.log('🌾 User seed processing complete!');
}
