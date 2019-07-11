import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Season } from './season.model'

const season = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Season.findById(args.id)
    .lean()
    .exec()
}

const newSeason = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Season.create({ ...args.input, createdBy: ctx.user._id })
}

const seasons = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Season.find({})
    .lean()
    .exec()
}

const updateSeason = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Season.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeSeason = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Season.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    seasons,
    season
  },
  Mutation: {
    newSeason,
    updateSeason,
    removeSeason
  }
}
