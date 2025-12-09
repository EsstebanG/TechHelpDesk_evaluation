import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';

import { TicketsService } from './tickets.service';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id_ticket')
  findOne(@Param('id_ticket', ParseIntPipe) id_ticket: number) {
    return this.ticketsService.findOne(id_ticket);
  }

  @Patch(':id_ticket')
  update(
    @Param('id_ticket', ParseIntPipe) id_ticket: number,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id_ticket, dto);
  }

  @Patch(':id_ticket/status')
  updateStatus(
    @Param('id_ticket', ParseIntPipe) id_ticket: number,
    @Body() dto: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateStatus(id_ticket, dto);
  }

  @Delete(':id_ticket')
  remove(@Param('id_ticket', ParseIntPipe) id_ticket: number) {
    return this.ticketsService.remove(id_ticket);
  }

  @Get('client/:id_client')
  findByClient(@Param('id_client', ParseIntPipe) id_client: number) {
    return this.ticketsService.findByClient(id_client);
  }

  @Get('technician/:id_technician')
  findByTechnician(
    @Param('id_technician', ParseIntPipe) id_technician: number,
  ) {
    return this.ticketsService.findByTechnician(id_technician);
  }
}
