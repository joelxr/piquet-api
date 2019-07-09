import mongoose from 'mongoose'

const driverSchema = new mongoose.Schema({
  driverId: {
    type: Number,
    required: true,
    unique: true
  },
  driverRef: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
})

export const Driver = mongoose.model('driver', driverSchema)
