import { DataSource } from 'typeorm';
import { Technician } from '../../modules/technicians/entities/technician.entity';
import { User } from '../../modules/users/entities/user.entity';

export async function technicianSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting technician seed process...');

    const technicianRepository = dataSource.getRepository(Technician);
    const userRepository = dataSource.getRepository(User);

    const count = await technicianRepository.count();

    if (count === 0) {
        const technicianUser1 = await userRepository.findOne({ where: { email: 'tech@techhelp.com' } });
        const technicianUser2 = await userRepository.findOne({ where: { email: 'tech2@techhelp.com' } });

        if (technicianUser1 && technicianUser2) {
            const technicians = [
                {
                    full_name: 'Carlos Sánchez',
                    specialty: 'Networking',
                    availability: 'Mon-Fri 9-5',
                    user: technicianUser1,
                },
                {
                    full_name: 'Laura Ramírez',
                    specialty: 'Software Support',
                    availability: 'Mon-Fri 9-5',
                    user: technicianUser2,
                },
            ];

            for (const technician of technicians) {
                const existingTechnician = await technicianRepository.findOne({ where: { user: { id_user: technician.user.id_user } } });

                if (existingTechnician) {
                    console.log(`⚠️ Technician with user ${technician.user.email} already exists, skipping...`);
                } else {
                    await technicianRepository.save(technician);
                    console.log(`✅ Technician ${technician.full_name} created successfully!`);
                }
            }
        } else {
            console.log('⚠️ One or more users not found for technicians.');
        }
    } else {
        console.log('⚠️ Technicians already exist, seed omitted.');
    }

    console.log('🌾 Technician seed processing complete!');
}
