import mongoose from 'mongoose'

const resultSchema = new mongoose.Schema(
  {
    resultId: {
      type: Number,
      required: true,
      unique: true
    },
    raceId: {
      type: Number,
      required: true
    },
    driverId: {
      type: Number,
      required: true
    },
    constructorId: {
      type: Number,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    grid: {
      type: Number,
      required: true
    },
    position: {
      type: Number
    },
    positionText: {
      type: String,
      required: true
    },
    positionOrder: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    laps: {
      type: Number,
      required: true
    },
    time: {
      type: String
    },
    milliseconds: {
      type: Number
    },
    fastestLap: {
      type: Number
    },
    rank: {
      type: Number
    },
    fastestLapTime: {
      type: String
    },
    fastestLapSpeed: {
      type: Number
    },
    statusId: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

export const Result = mongoose.model('result', resultSchema)
