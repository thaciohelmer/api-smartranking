import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Post, Query } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly _playersService: PlayersService) { }

  @Post()
  async CreateUpdatePlayer(@Body() playerDto: CreatePlayerDTO) {
    this._playersService.CreateUpdatePlayer(playerDto)
  }

  @Get('/findBy')
  async GetByEmail(@Query('email') email: string): Promise<Player> {
    if (email.trim().length == 0) throw new BadRequestException('Invalid email...')
    return this._playersService.GetByEmail(email)
  }

  @Get()
  async GetAllPlayers(): Promise<Player[]> {
    return this._playersService.GetAllPlayers()
  }

  @Delete()
  async DeletePlayer(@Query('email') email: string): Promise<void> {
    if (email.trim().length == 0) throw new BadRequestException('Invalid email...')
    this._playersService.DeletePlayer(email)
  }

}
