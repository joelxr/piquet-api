import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { LapTime } from './lapTime.model'

const lapTime = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return LapTime.findById(args.id)
    .lean()
    .exec()
}

const newLapTime = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return LapTime.create({ ...args.input, createdBy: ctx.user._id })
}

const lapTimes = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return LapTime.find({})
    .lean()
    .exec()
}

const updateLapTime = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return LapTime.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeLapTime = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return LapTime.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    lapTimes,
    lapTime
  },
  Mutation: {
    newLapTime,
    updateLapTime,
    removeLapTime
  }
}
