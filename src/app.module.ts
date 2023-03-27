import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

const uri = 'mongodb://thaciohelmer:thaciohelmer123@localhost:27017'

@Module({
  imports: [
    MongooseModule.forRoot(uri,
      {
        dbName: 'curso_nestjs'
      }
    ),
    PlayersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
