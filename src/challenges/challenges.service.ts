import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { AssingMatchChallengeDto } from './dtos/assing-match-challenge.dto';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { Challenge, Match } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {

  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match') private readonly matchModel: Model<Match>,
    private readonly playerService: PlayersService,
  ) { }

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
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

    const requesterPlayer = [playerOne, playerTwo].find(player => player._id.toString() === requesterIsMatchPlayer)

    if (!requesterIsMatchPlayer) {
      throw new BadRequestException('Requester must be a player in the match')
    }

    if (!requesterPlayer?.ranking) {
      throw new BadRequestException('Requester must be a parte of a ranking')
    }

    const createdChalleng = new this.challengeModel(createChallengeDto)
    createdChalleng.category = requesterPlayer.ranking
    createdChalleng.challengeDate = new Date()
    createdChalleng.status = ChallengeStatus.PENDING
    await createdChalleng.save()

    return createdChalleng
  }

  async getAll(): Promise<Array<Challenge>> {
    return await this.challengeModel.find()
      .populate(["requester", "players", "match"])
  }

  async assingMatchChallenge(id: string, assingMatchChallengeDto: AssingMatchChallengeDto): Promise<void> {
    const challenge = await this.challengeModel.findById(id)

    if (!challenge) {
      throw new BadRequestException('Challenge not found')
    }

    const verifyDef = challenge.players.includes(assingMatchChallengeDto.def)

    if (!verifyDef) {
      throw new BadRequestException('The winner is not part of the match')
    }

    const createdMatch = new this.matchModel(assingMatchChallengeDto)
    createdMatch.category = challenge.category
    createdMatch.players = challenge.players

    const result = await createdMatch.save()

    challenge.status = ChallengeStatus.REALIZED
    challenge.match = result._id

    try {
      await this.challengeModel.findOneAndUpdate({ _id: id }, { $set: challenge })
    } catch (error) {
      await this.matchModel.deleteOne({ _id: result._id })
      throw new InternalServerErrorException()
    }
  }

  async update(id: string, updateChallengeDto: UpdateChallengeDto): Promise<void> {
    const challenge = await this.challengeModel.findById(id)

    if (!challenge) {
      throw new BadRequestException('Challenge not found')
    }

    if (updateChallengeDto.status) {
      challenge.responseDate = new Date()
    }

    challenge.status = updateChallengeDto.status
    challenge.challengeDate = updateChallengeDto.challengeDate

    await this.challengeModel.findOneAndUpdate({ _id: id }, { $set: challenge })
  }

  async delete(id: string): Promise<void> {
    const challenge = await this.challengeModel.findById(id)

    if (!challenge) {
      throw new BadRequestException('Challenge not found')
    }

    challenge.status = ChallengeStatus.CANCELED
    await this.challengeModel.findOneAndUpdate({ _id: id }, { $set: challenge })
  }
}
