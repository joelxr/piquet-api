import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { PitStop } from './pitStop.model'

const pitStop = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return PitStop.findById(args.id)
    .lean()
    .exec()
}

const newPitStop = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return PitStop.create({ ...args.input, createdBy: ctx.user._id })
}

const pitStops = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return PitStop.find({})
    .lean()
    .exec()
}

const updatePitStop = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return PitStop.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removePitStop = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return PitStop.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    pitStops,
    pitStop
  },
  Mutation: {
    newPitStop,
    updatePitStop,
    removePitStop
  }
}
