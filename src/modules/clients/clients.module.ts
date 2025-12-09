import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ClientsService } from '../clients/clients.service';

// Controlador. / Controller.
import { ClientsController } from '../clients/clients.controller';

// Entidades. / Entities.
import { Client } from '../clients/entities/client.entity';

import { User } from '../users/entities/user.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Module({
  imports: [TypeOrmModule.forFeature([Client, User])],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})

export class ClientsModule {}
