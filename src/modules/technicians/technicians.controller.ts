import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';

import { TechniciansService } from './technicians.service';

import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post()
  create(@Body() dto: CreateTechnicianDto) {
    return this.techniciansService.create(dto);
  }

  @Get()
  findAll() {
    return this.techniciansService.findAll();
  }

  @Get(':id_technician')
  findOne(@Param('id_technician', ParseIntPipe) id_technician: number) {
    return this.techniciansService.findOne(id_technician);
  }

  @Patch(':id_technician')
  update(
    @Param('id_technician', ParseIntPipe) id_technician: number,
    @Body() dto: UpdateTechnicianDto,
  ) {
    return this.techniciansService.update(id_technician, dto);
  }

  @Delete(':id_technician')
  remove(@Param('id_technician', ParseIntPipe) id_technician: number) {
    return this.techniciansService.remove(id_technician);
  }
}
