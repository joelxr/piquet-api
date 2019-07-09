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
  number: {
    type: Number
  },
  code: {
    type: String,
    trim: true
  },
  forename: {
    type: String,
    trim: true
  },
  surname: {
    type: String,
    trim: true
  },
  dob: {
    type: Date,
  },
  nationality: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  }
})

export const Driver = mongoose.model('driver', driverSchema)
