import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

  private readonly logger = new Logger(PlayersService.name)
  private players: Player[] = []

  constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }

  async CreateUpdatePlayer(playerDto: CreatePlayerDTO): Promise<void> {
    const { email } = playerDto
    const player: Player = await this.playerModel.findOne({ email })
    if (player) this.Update(playerDto)
    else this.Create(playerDto)
  }

  async GetAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find()
  }

  async GetByEmail(email: string): Promise<Player> {
    const player: Player = await this.playerModel.findOne({ email })
    if (player) return player
    else throw new NotFoundException('Player not found...')
  }

  async DeletePlayer(email: string): Promise<void> {
    return await this.playerModel.findOneAndRemove({ email })
  }

  private async Create(playerDto: CreatePlayerDTO): Promise<Player> {
    const player: Player = new this.playerModel(playerDto)
    return await player.save()
  }

  private async Update(playerDto: CreatePlayerDTO): Promise<Player> {
    return await this.playerModel.findOneAndUpdate({ email: playerDto.email }, { $set: playerDto })
  }
}
