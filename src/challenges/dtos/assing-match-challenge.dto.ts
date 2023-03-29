import { IsNotEmpty } from "class-validator";
import { Result } from "../interfaces/challenge.interface";

export class AssingMatchChallengeDto {
  @IsNotEmpty()
  def: string

  @IsNotEmpty()
  result: Array<Result>
}