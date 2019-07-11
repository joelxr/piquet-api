import mongoose from 'mongoose'

const seasonSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  }
})

export const Season = mongoose.model('season', seasonSchema)
