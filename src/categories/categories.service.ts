import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interface/category.interface';


@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersServices: PlayersService
  ) { }

  async Create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto
    const verifyCategory: Category = await this.categoryModel.findOne({ category })
    if (verifyCategory) throw new BadRequestException('Category already registered')
    const newCategory: Category = new this.categoryModel(createCategoryDto)
    return await newCategory.save()
  }

  async GetAll(): Promise<Array<Category>> {
    return await this.categoryModel.find().populate('players')
  }

  async GetById(id: string): Promise<Category> {
    const category: Category = await this.categoryModel.findOne({ _id: id })
    if (!category) throw new NotFoundException('Category not found')
    return category
  }

  async Update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
    const category: Category = await this.categoryModel.findOne({ _id: id })
    if (!category) throw new NotFoundException('Category not found')
    await this.categoryModel.findOneAndUpdate({ _id: id }, { $set: updateCategoryDto })
  }

  async Delete(id: string): Promise<void> {
    const category: Category = await this.categoryModel.findOne({ _id: id })
    if (!category) throw new NotFoundException('Category not found')
    await this.categoryModel.deleteOne({ _id: id })
  }

  async AssignCategoryPlayer(categoryId: string, playerId: string): Promise<void> {
    const category: Category = await this.categoryModel.findOne({ _id: categoryId })
    const player: Player = await this.playersServices.getById(playerId)

    if (!category) throw new NotFoundException('Category not found')
    if (category.players.includes(playerId)) throw new BadRequestException('Player already registered in the category')
    if (!player) throw new NotFoundException('Player not found')

    category.players.push(playerId)
    await this.categoryModel.findByIdAndUpdate({ _id: categoryId }, { $set: category })
  }
}
