import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, } from '@nestjs/common';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Guard.
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { CategoriesService } from './categories.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id_category')
  findOne(@Param('id_category', ParseIntPipe) id_category: number) {
    return this.categoriesService.findOne(id_category);
  }

  @Patch(':id_category')
  update(
    @Param('id_category', ParseIntPipe) id_category: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id_category, dto);
  }

  @Delete(':id_category')
  remove(@Param('id_category', ParseIntPipe) id_category: number) {
    return this.categoriesService.remove(id_category);
  }
}
