import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";
export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDate: Date

  @IsNotEmpty()
  requester: string

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<string>
}