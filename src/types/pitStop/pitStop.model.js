import mongoose from 'mongoose'

const pitStopSchema = new mongoose.Schema({
  raceId: {
    type: Number,
    required: true,
    unique: true
  },
  driverId: {
    type: Number,
    required: true,
  },
  stop: {
    type: Number,
    required: true
  },
  lap: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  milliseconds: {
    type: Number
  }
})

export const PitStop = mongoose.model('pit_stop', pitStopSchema)
