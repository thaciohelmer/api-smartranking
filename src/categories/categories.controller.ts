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
  async CreateCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.Create(createCategoryDto)
  }

  @Get()
  async GetAllCategories(): Promise<Array<Category>> {
    return await this.categoryService.GetAll()
  }

  @Get('/:id')
  async GetById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.GetById(id)
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async Update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string
  ): Promise<void> {
    return await this.categoryService.Update(id, updateCategoryDto)
  }

  @Delete('/:id')
  async DeleteCategory(@Param('id') id: string): Promise<void> {
    return await this.categoryService.Delete(id)
  }

  @Post('/:categoryId/player/:playerId')
  async AssignCategoryPlayer(@Param() params: string[]): Promise<void> {
    const categoryId: string = params['categoryId']
    const playerId: string = params['playerId']
    return await this.categoryService.AssignCategoryPlayer(categoryId, playerId)
  }

}
