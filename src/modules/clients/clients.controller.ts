import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ClientsService } from './clients.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id_client')
  findOne(@Param('id_client', ParseIntPipe) id_client: number) {
    return this.clientsService.findOne(id_client);
  }

  @Patch(':id_client')
  update(
    @Param('id_client', ParseIntPipe) id_client: number,
    @Body() dto: UpdateClientDto,
  ) {
    return this.clientsService.update(id_client, dto);
  }

  @Delete(':id_client')
  remove(@Param('id_client', ParseIntPipe) id_client: number) {
    return this.clientsService.remove(id_client);
  }
}
