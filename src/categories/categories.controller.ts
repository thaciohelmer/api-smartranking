import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interface/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {

  constructor(private readonly categoryService: CategoriesService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(createCategoryDto)
  }

  @Get()
  async getAllCategories(): Promise<Array<Category>> {
    return await this.categoryService.getAll()
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.getById(id)
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string
  ): Promise<void> {
    return await this.categoryService.update(id, updateCategoryDto)
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return await this.categoryService.delete(id)
  }

  @Post('/:categoryId/player/:playerId')
  async assignCategoryPlayer(@Param() params: string[]): Promise<void> {
    const categoryId: string = params['categoryId']
    const playerId: string = params['playerId']
    return await this.categoryService.assignCategoryPlayer(categoryId, playerId)
  }

  @Get('/category/:player')
  async getPlayerCategory(@Param('player') id: string): Promise<Category> {
    return await this.categoryService.getPlayerCategory(id)
  }

}
