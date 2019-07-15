import mongoose from 'mongoose'

const constructorStandingSchema = new mongoose.Schema(
  {
    constructorStandingsId: {
      type: Number,
      required: true,
      unique: true
    },
    raceId: {
      type: Number,
      required: true
    },
    constructorId: {
      type: Number,
      required: true
    },
    points: {
      type: Number
    },
    positions: {
      type: Number
    },
    positionText: {
      type: String
    },
    wins: {
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

export const ConstructorStanding = mongoose.model(
  'constructor_standing',
  constructorStandingSchema
)
