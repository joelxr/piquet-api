import mongoose from 'mongoose'

const lapTimeSchema = new mongoose.Schema({
  raceId: {
    type: Number,
    required: true,
    unique: true
  },
  driverId: {
    type: Number,
    required: true,
  },
  lap: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
  },
  time: {
    type: String,
  },
  milliseconds: {
    type: Number
  }
})

export const LapTime = mongoose.model('lap_time', lapTimeSchema)
