import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { TicketsService } from './tickets.service';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Crear ticket (Solo clientes pueden crear tickets). / Create ticket (Only customers can create tickets).
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  // Listar todos los tickets (Solo administradores pueden ver todos los tickets). / List all tickets (Only administrators can see all tickets).
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.ticketsService.findAll();
  }

  // Obtener ticket por ID (Cualquiera puede verlo, si tiene acceso al ticket). / Get ticket by ID (Anyone can view it if they have access to the ticket).
  @Get(':id_ticket')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id_ticket', ParseIntPipe) id_ticket: number) {
    return this.ticketsService.findOne(id_ticket);
  }

  // Actualizar ticket (Solo técnicos y administradores pueden actualizar tickets). / Update ticket (Only technicians and administrators can update tickets).
  @Patch(':id_ticket')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TECHNICIAN, UserRole.ADMIN)
  update(
    @Param('id_ticket', ParseIntPipe) id_ticket: number,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id_ticket, dto);
  }

  // Cambiar el estado del ticket (Solo técnicos y administradores pueden cambiar el estado). / Change ticket status (Only technicians and administrators can change the status)
  @Patch(':id_ticket/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TECHNICIAN, UserRole.ADMIN)
  updateStatus(
    @Param('id_ticket', ParseIntPipe) id_ticket: number,
    @Body() dto: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateStatus(id_ticket, dto);
  }

  // Eliminar ticket (Solo administradores pueden eliminar tickets). / Delete ticket (Only administrators can delete tickets).
  @Delete(':id_ticket')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id_ticket', ParseIntPipe) id_ticket: number) {
    return this.ticketsService.remove(id_ticket);
  }

  // Obtener tickets de un cliente (Solo administradores y el cliente pueden ver sus tickets). / Get tickets from a customer (Only administrators and the customer can see their tickets)
  @Get('client/:id_client')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  findByClient(@Param('id_client', ParseIntPipe) id_client: number) {
    return this.ticketsService.findByClient(id_client);
  }

  // Obtener tickets asignados a un técnico (Solo administradores y técnicos pueden ver sus tickets). / Get tickets assigned to a technician (Only administrators and technicians can see their tickets)
  @Get('technician/:id_technician')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN)
  findByTechnician(
    @Param('id_technician', ParseIntPipe) id_technician: number,
  ) {
    return this.ticketsService.findByTechnician(id_technician);
  }
}
