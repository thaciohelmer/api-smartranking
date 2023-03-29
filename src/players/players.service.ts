import { Injectable } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDTO } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {

  constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {

    const { email } = createPlayerDTO
    const existingPlayer: Player = await this.playerModel.findOne({ email })

    if (existingPlayer) {
      throw new BadRequestException('The email is already in use')
    }

    const player: Player = new this.playerModel(createPlayerDTO)
    player.ranking = 'C'
    await player.save()

    return player
  }

  async updatePlayer(id: string, playerDto: UpdatePlayerDTO): Promise<void> {
    const verifyPlayer: Player = await this.playerModel.findOne({ _id: id })
    if (!verifyPlayer) throw new NotFoundException('Player not found')
    await this.playerModel.findOneAndUpdate({ _id: id }, { $set: playerDto })
  }

  async getAllPlayers(): Promise<Array<Player>> {
    return await this.playerModel.find()
  }

  async getById(id: string): Promise<Player> {
    const player: Player = await this.playerModel.findOne({ _id: id })
    if (!player) throw new NotFoundException('Player not found...')
    return player
  }

  async deletePlayer(id: string): Promise<void> {
    const verifyPlayer: Player = await this.playerModel.findOne({ _id: id })
    if (!verifyPlayer) throw new NotFoundException('Player not found')
    await this.playerModel.deleteOne({ _id: id })
  }
}
