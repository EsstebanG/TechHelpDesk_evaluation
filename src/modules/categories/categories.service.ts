import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
      @InjectRepository(Category)
      private readonly categoryRepo: Repository<Category>,
    ) {}

    async create(dto: CreateCategoryDto) {
        const exists = await this.categoryRepo.findOne({
            where: { name: dto.name },
        });

        if (exists) {
            throw new BadRequestException('Category name is already in use...');
        }

        const category = this.categoryRepo.create(dto);
        return await this.categoryRepo.save(category);
    }

    findAll() {
        return this.categoryRepo.find();
    }

    async findOne(id_category: number) {
        const category = await this.categoryRepo.findOne({
            where: { id_category },
        });

        if (!category) {
        throw new NotFoundException(
            `Category with ID ${id_category} not found...`,
        );
        }

        return category;
    }

    async update(id_category: number, dto: UpdateCategoryDto) {
      const category = await this.findOne(id_category);

      if (dto.name && dto.name !== category.name) {
            const exists = await this.categoryRepo.findOne({
                where: { name: dto.name },
            });
            if (exists) {
                throw new BadRequestException('Category name is already in use...');
            }
        }

        Object.assign(category, dto);
        return await this.categoryRepo.save(category);
    }

    async remove(id_category: number) {
        const category = await this.findOne(id_category);
        return await this.categoryRepo.remove(category);
    }
}
