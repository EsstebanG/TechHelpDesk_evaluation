import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

import { Ticket } from './entities/ticket.entity';
import { Client } from '../clients/entities/client.entity';
import { Technician } from '../technicians/entities/technician.entity';
import { Category } from '../categories/entities/category.entity';

import { RolesGuard } from '../auth/guard/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Client, Technician, Category]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    RolesGuard,
  ],
  exports: [TicketsService],
})

export class TicketsModule {}
