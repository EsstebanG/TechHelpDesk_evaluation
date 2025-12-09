import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechniciansService } from './technicians.service';

import { TechniciansController } from './technicians.controller';

import { Technician } from './entities/technician.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technician, User])],
  controllers: [TechniciansController],
  providers: [TechniciansService],
  exports: [TechniciansService]
})

export class TechniciansModule {}
