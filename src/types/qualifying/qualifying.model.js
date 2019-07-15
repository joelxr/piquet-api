import mongoose from 'mongoose'

const qualifyingSchema = new mongoose.Schema(
  {
    qualifyId: {
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
    position: {
      type: Number
    },
    q1: {
      type: String
    },
    q2: {
      type: String
    },
    q3: {
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

export const Qualifying = mongoose.model('qualifying', qualifyingSchema)
