import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesService } from './challenges/challenges.service';
import { ChallengesController } from './challenges/challenges.controller';
import { ChallengesModule } from './challenges/challenges.module';

const uri = 'mongodb://thaciohelmer:thaciohelmer123@localhost:27017'

@Module({
  imports: [
    MongooseModule.forRoot(uri,
      {
        dbName: 'curso_nestjs'
      }
    ),
    PlayersModule,
    CategoriesModule,
    ChallengesModule
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService]
})
export class AppModule { }
