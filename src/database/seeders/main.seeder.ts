import { DataSource } from 'typeorm';
import { userSeeder } from './user.seeder';
import { clientSeeder } from './client.seeder';
import { technicianSeeder } from './technician.seeder';
import { categorySeeder } from './category.seeder';
import { ticketSeeder } from './ticket.seeder';

export async function runSeeders(dataSource: DataSource): Promise<void> {
    console.log('🌱 Running all seeders...\n');

    try {
        await userSeeder(dataSource);
        await clientSeeder(dataSource);
        await technicianSeeder(dataSource);
        await categorySeeder(dataSource);
        await ticketSeeder(dataSource);
    } catch (error) {
        console.error('❌ Error during seed execution:', error);
    }

    console.log('\n🌾 All seeders executed successfully!');
}
