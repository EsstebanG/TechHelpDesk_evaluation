import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { UsersService } from './users.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// JWT Guard.
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // Controlador para crear usuario. / Controller for creating users.
    @Post()
    create(@Body() dto: CreateUserDto) {
      return this.userService.create(dto);
    }

    // Proteger la ruta de listar usuarios (solo accesible por admins o técnicos). / Protect the user listing route (only accessible by administrators or technicians).
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'technician')
    findAll() {
        return this.userService.findAll();
    }

    // Proteger la ruta de buscar usuario por ID (solo accesible por admins o el propio usuario). / Protect the route for searching users by ID (only accessible by admins or the user themselves).
    @Get(':id_user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'technician', 'client')
    findOne(@Param('id_user', ParseIntPipe) id_user: number) {
        return this.userService.findOne(id_user);
    }

    // Proteger la ruta de actualizar usuario (solo accesible por admins o el propio usuario). / Protect the user update path (only accessible by admins or the user themselves).
    @Patch(':id_user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'technician', 'client')
    update(
        @Param('id_user', ParseIntPipe) id_user: number,
        @Body() dto: UpdateUserDto,
    ) {
        return this.userService.update(id_user, dto);
    }

    // Proteger la ruta de eliminar usuario (solo accesible por admins). / Protect the user deletion path (only accessible by admins).
    @Delete(':id_user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id_user', ParseIntPipe) id_user: number) {
        return this.userService.remove(id_user);
    }
}
