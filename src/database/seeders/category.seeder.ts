import { DataSource } from 'typeorm';
import { Category } from '../../modules/categories/entities/category.entity';

export async function categorySeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting category seed process...');

    const categoryRepository = dataSource.getRepository(Category);

    const count = await categoryRepository.count();

    if (count === 0) {
        const categories = [
            { name: 'Request', description: 'General requests' },
            { name: 'Hardware Incident', description: 'Hardware-related issues' },
            { name: 'Software Incident', description: 'Software-related issues' },
        ];

        await categoryRepository.save(categories);
        console.log('✅ Categories created successfully!');
    } else {
        console.log('⚠️ Categories already exist, seed omitted.');
    }

    console.log('🌾 Category seed processing complete!');
}
