import mongoose from 'mongoose'

const circuitSchema = new mongoose.Schema(
  {
    circuitId: {
      type: Number,
      required: true,
      unique: true
    },
    circuitRef: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    alt: {
      type: Number
    },
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

export const Circuit = mongoose.model('circuit', circuitSchema)
