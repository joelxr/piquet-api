import mongoose from 'mongoose'

const statusSchema = new mongoose.Schema({
  statusId: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true
  }
})

export const Status = mongoose.model('status', statusSchema)
