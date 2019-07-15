import mongoose from 'mongoose'

const constructorSchema = new mongoose.Schema(
  {
    constructorId: {
      type: Number,
      required: true,
      unique: true
    },
    constructorRef: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    nationality: {
      type: String
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

export const Constructor = mongoose.model('constructors', constructorSchema)
