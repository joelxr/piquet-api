import mongoose from 'mongoose'

const raceSchema = new mongoose.Schema(
  {
    raceId: {
      type: Number,
      required: true,
      unique: true
    },
    year: {
      type: Number,
      required: true
    },
    round: {
      type: Number,
      required: true
    },
    circuitId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String
    },
    url: {
      type: String
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

export const Race = mongoose.model('race', raceSchema)
