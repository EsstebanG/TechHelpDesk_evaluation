import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { UsersService } from './users.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Controlador para crear usuario. / Controller for creating users.
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  // Controlador para listar todos los usuarios. / Controller to list all users.
  @Get()
  findAll() {
      return this.userService.findAll();
  }

  // Controlador para buscar usuario por ID. / Controller to search for user by ID.
  @Get(':id_user')
  findOne(@Param('id_user', ParseIntPipe) id_user: number) {
      return this.userService.findOne(id_user);
  }

  // Controlador para actualizar usuario. / Controller for updating users.
  @Patch(':id_user')
  update(
      @Param('id_user', ParseIntPipe) id_user: number,
      @Body() dto: UpdateUserDto,
  ) {
      return this.userService.update(id_user, dto);
  }

  // Controlador para eliminar usuario. / Controller to delete user.
  @Delete(':id_user')
  remove(@Param('id_user', ParseIntPipe) id_user: number) {
      return this.userService.remove(id_user);
  }
}
