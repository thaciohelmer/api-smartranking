import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common/decorators';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import PlayersParametersValidation from '../comons/pipes/parameters-validation.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly playersService: PlayersService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDto)
  }

  @Put('/:id')
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDTO,
    @Param('id', PlayersParametersValidation) id: string
  ): Promise<void> {
    await this.playersService.updatePlayer(id, updatePlayerDto)
  }

  @Get('/:id')
  async getById(@Param('id', PlayersParametersValidation) id: string): Promise<Player> {
    return await this.playersService.getById(id)
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAllPlayers()
  }

  @Delete('/:id')
  async DeletePlayer(@Param('id', PlayersParametersValidation) id: string): Promise<void> {
    await this.playersService.deletePlayer(id)
  }

}
