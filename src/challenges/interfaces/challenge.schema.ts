import { Schema } from "mongoose";

export const ChallengeSchema = new Schema({
  status: {
    type: String
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: "Player"
  },
  challengeDate: {
    type: Date
  },
  requestDate: {
    type: Date
  },
  responseDate: {
    type: Date
  },
  category: {
    type: String
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player"
    }
  ],
  match: {
    type: Schema.Types.ObjectId,
    ref: "Match"
  },
}, { timestamps: true, collection: 'challenges' })