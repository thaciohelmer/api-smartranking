import { Schema } from "mongoose";

export const MatchSchema = new Schema({
  category: { type: String },
  players: [{
    type: Schema.Types.ObjectId,
    ref: "Player"
  }],
  def: { type: Schema.Types.ObjectId, ref: 'Player' },
  result: [
    { set: { type: String } }
  ]
}, { timestamps: true, collection: 'matchs' })