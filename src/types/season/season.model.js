import mongoose from 'mongoose'

const seasonSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true
    },
    url: {
      type: String,
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

export const Season = mongoose.model('season', seasonSchema)
