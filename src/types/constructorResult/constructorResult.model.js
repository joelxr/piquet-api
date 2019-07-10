import mongoose from 'mongoose'

const constructorResultSchema = new mongoose.Schema({
  constructorResultsId: {
    type: Number,
    required: true,
    unique: true
  },
  raceId: {
    type: Number,
    required: true,
    unique: true    
  },
  constructorId: {
    type: Number,
    required: true,
    unique: true
  },
  points: {
    type: Number
  },
  status: {
    type: String,
    trim: true
  }
})

export const ConstructorResult = mongoose.model('constructor_result', constructorResultSchema)
