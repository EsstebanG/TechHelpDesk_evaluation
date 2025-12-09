import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { UsersService } from './users.service';

// Controlador. / Controller.
import { UsersController } from './users.controller';

// Entidad. / Entity.
import { User } from './entities/user.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})

export class UsersModule {}
