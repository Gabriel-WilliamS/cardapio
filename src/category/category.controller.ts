import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { IRequest } from 'global/types';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() { name }: CreateCategoryDto, @Request() req: IRequest) {
    const menu = {
      userId: req.user.id,
      name,
    };
    return this.categoryService.create(menu);
  }

  @Get()
  findAll(@Request() req: IRequest) {
    return this.categoryService.findAll(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: IRequest,
    @Body() { name }: UpdateCategoryDto,
  ) {
    return this.categoryService.update({ id, name, userId: req.user.id });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: IRequest) {
    return this.categoryService.remove({ id, userId: req.user.id });
  }
}
