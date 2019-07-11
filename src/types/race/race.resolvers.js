import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Race } from './race.model'

const race = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Race.findById(args.id)
    .lean()
    .exec()
}

const newRace = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Race.create({ ...args.input, createdBy: ctx.user._id })
}

const races = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Race.find({})
    .lean()
    .exec()
}

const updateRace = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Race.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeRace = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Race.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    races,
    race
  },
  Mutation: {
    newRace,
    updateRace,
    removeRace
  }
}
