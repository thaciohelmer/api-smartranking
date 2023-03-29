import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge, Match } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match') private readonly matchModel: Model<Match>,
    private readonly playerService: PlayersService,
    private readonly categoryService: CategoriesService
  ) { }


  async createChallenge(createChallengeDto: CreateChallengeDto): Promise<void> {

    const { players, requester } = createChallengeDto
    const playerOne = await this.playerService.getById(players[0])
    const playerTwo = await this.playerService.getById(players[1])

    if (!playerOne) {
      throw new BadRequestException(`Player One - No player found with that id: ${players[0]}`)
    }

    if (!playerTwo) {
      throw new BadRequestException(`Player Two - No player found with that id: ${players[1]}`)
    }

    const requesterIsMatchPlayer = createChallengeDto.players.find(
      player => player === requester)

    if (!requesterIsMatchPlayer) {
      throw new BadRequestException('Requester must be a player in the match!')
    }

    const createdChalleng = new this.challengeModel(createChallengeDto)
    //createdChalleng.category = 

  }
}
