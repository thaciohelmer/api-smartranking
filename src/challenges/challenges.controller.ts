import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Get, Post, Put } from '@nestjs/common/decorators';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { ChallengesService } from './challenges.service';
import { AssingMatchChallengeDto } from './dtos/assing-match-challenge.dto';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';

@Controller('api/v1/challenges')
export class ChallengesController {

  constructor(private readonly challengesService: ChallengesService) { }

  @Post()
  async createChallenge(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    return await this.challengesService.create(createChallengeDto)
  }

  @Get()
  async getAllChallenges(): Promise<Array<Challenge>> {
    return await this.challengesService.getAll()
  }

  @Post("/:challenge/match")
  async assingMatchChallenge(
    @Body(ValidationPipe) assingMatchChallengeDto: AssingMatchChallengeDto,
    @Param('challenge') id: string): Promise<void> {
    return await this.challengesService.assingMatchChallenge(id, assingMatchChallengeDto)
  }

  @Put('/:challenge')
  async updateChallenge(
    @Body(ValidationPipe) updateChallengeDto: UpdateChallengeDto,
    @Param('challenge') id: string): Promise<void> {
    return await this.challengesService.update(id, updateChallengeDto)
  }

  @Delete('/:challenge/')
  async deleteChallenge(@Param('challenge') id: string): Promise<void> {
    return this.challengesService.delete(id)
  }

}
