import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { envValidationSchema } from './config/config.validation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Modulos. / Modules.


// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Middlewares.


// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // 💡 config.getOrThrow() elimina el error: "db is possibly undefined"
        const db = config.getOrThrow<{
          host: string;
          port: number;
          username: string;
          password: string;
          name: string;
        }>('database');

        return {
          type: 'postgres' as const,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.name,
          autoLoadEntities: true,
          synchronize: true,   // SOLO para desarrollo (prueba técnica)
          logging: true,
        };
      },
    }),

    // UserModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
