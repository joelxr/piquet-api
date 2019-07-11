import mongoose from 'mongoose'

const driverStandingSchema = new mongoose.Schema({
  driverStandingsId: {
    type: Number,
    required: true,
    unique: true
  },
  raceId: {
    type: Number,
    required: true,
  },
  driverId: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
  },
  positionText: {
    type: String
  },
  wins: {
    type: Number,
    required: true
  }
})

export const DriverStanding = mongoose.model('driver_standing', driverStandingSchema)
