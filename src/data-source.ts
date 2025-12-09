import { DataSource } from 'typeorm';

// Cargar variables de entorno. / Load environment variables.
import * as dotenv from 'dotenv';
dotenv.config();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Qwe.123*',
    database: process.env.DB_NAME || 'tech_help_desk',
    synchronize: false,
    logging: true,
    entities: [__dirname + '/modules/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
});
