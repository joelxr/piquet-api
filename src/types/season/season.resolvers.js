import { AuthenticationError } from 'apollo-server'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { roles } from '../../utils/auth'
import { Season } from './season.model'

const season = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Season.findOne(args.filter)
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

  const query = Season.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateSeason = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Season.findOneAndUpdate({ year: args.year }, update, { new: true })
    .lean()
    .exec()
}

const removeSeason = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Season.findOneAndRemove({ year: args.year })
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
