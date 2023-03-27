import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class PlayersService {

  private readonly logger = new Logger(PlayersService.name)
  private players: Player[] = []

  async CreateUpdatePlayer(playerDto: CreatePlayerDTO): Promise<void> {

    const { email } = playerDto
    const player = this.players.find(player => player.email == email)

    if (player) this.Update(player, playerDto)
    else this.Create(playerDto)
  }

  async GetAllPlayers(): Promise<Player[]> {
    return await this.players
  }

  async GetByEmail(email: string): Promise<Player> {

    const player: Player = this.players.find(player => player.email === email)

    if (player) return player
    else throw new NotFoundException('Player not found...')
  }

  async DeletePlayer(email: string): Promise<void> {
    const player: Player = this.players.find(player => player.email === email)
    if (player) this.players = this.players.filter(player => player.email !== email)
    else throw new NotFoundException('Player not found...')
  }

  private Create(playerDto: CreatePlayerDTO): void {

    const { name, phoneNumber, email, avatarUrl } = playerDto

    const player: Player = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      avatarUrl,
      ranking: "A",
      rankingPosition: 1
    }

    // this.logger.log(player)
    this.players.push(player)

  }

  private async Update(player: Player, playerDto: CreatePlayerDTO): Promise<void> {
    const { name, avatarUrl } = playerDto

    player.name = (name.trim().length > 0) ? name : player.name
    player.avatarUrl = (avatarUrl.trim().length > 0) ? avatarUrl : player.avatarUrl
  }


}
