import { DataSource } from 'typeorm';
import { Client } from '../../modules/clients/entities/client.entity';
import { User } from '../../modules/users/entities/user.entity';

export async function clientSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting client seed process...');

    const clientRepository = dataSource.getRepository(Client);
    const userRepository = dataSource.getRepository(User);

    const count = await clientRepository.count();

    if (count === 0) {
        const clientUser = await userRepository.findOne({ where: { email: 'client@techhelp.com' } });

        if (clientUser) {
            const clients = [
                {
                    full_name: 'Juan Pérez',
                    company: 'TechHelp Inc.',
                    contact_email: 'juan.perez@example.com',
                    user: clientUser,
                },
                {
                    full_name: 'María García',
                    company: 'TechHelp Ltd.',
                    contact_email: 'maria.garcia@example.com',
                    user: clientUser,
                },
            ];

            for (const client of clients) {
                const existingClient = await clientRepository.findOne({ where: { user: { id_user: client.user.id_user } } });
                if (existingClient) {
                    console.log(`⚠️ Client with user ${client.user.email} already exists, skipping...`);
                } else {
                    await clientRepository.save(client);
                    console.log(`✅ Client ${client.contact_email} created successfully!`);
                }
            }
        } else {
            console.log('⚠️ No user with email client@techhelp.com found.');
        }
    } else {
        console.log('⚠️ Clients already exist, seed omitted.');
    }

    console.log('🌾 Client seed processing complete!');
}
