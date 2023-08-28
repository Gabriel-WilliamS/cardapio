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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { IRequest } from 'global/types';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() { name }: CreateMenuDto, @Request() req: IRequest) {
    const menu = {
      userId: req.user.id,
      name,
    };
    return this.menuService.create(menu);
  }

  @Get()
  findAll(@Request() req: IRequest) {
    return this.menuService.findAll(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: IRequest,
    @Body() { name }: UpdateMenuDto,
  ) {
    return this.menuService.update({ id, name, userId: req.user.id });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: IRequest) {
    return this.menuService.remove({ id, userId: req.user.id });
  }
}
