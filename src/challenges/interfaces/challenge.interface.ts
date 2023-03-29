import { Document } from "mongoose";
import { Player } from "src/players/interfaces/player.interface";
import { ChallengeStatus } from "./challenge-status.enum";

export interface Challenge extends Document {
  status: ChallengeStatus
  requester: string
  challengeDate: string
  requestDate: string
  responseDate: string
  category: string
  players: Array<string>
  match: Match
}

export interface Match extends Document {
  category: string
  def: Player,
  result: Array<Result>
  players: Array<string>
}

export interface Result {
  set: string
}