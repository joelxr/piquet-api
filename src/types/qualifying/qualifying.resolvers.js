import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Qualifying } from './qualifying.model'
import { joinDriver } from '../driver/driver.resolvers'
import { joinRace } from '../race/race.resolvers'
import { joinConstructor } from '../constructor/constructor.resolvers'

const qualifying = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Qualifying.findOne({ qualifyId: args.qualifyId })
    .lean()
    .exec()
}

const newQualifying = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Qualifying.create({ ...args.input, createdBy: ctx.user._id })
}

const qualifyings = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Qualifying.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateQualifying = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Qualifying.findOneAndUpdate({ qualifyId: args.qualifyId }, update, {
    new: true
  })
    .lean()
    .exec()
}

const removeQualifying = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Qualifying.findOneAndRemove({ qualifyId: args.qualifyId })
    .lean()
    .exec()
}

export default {
  Query: {
    qualifyings,
    qualifying
  },
  Mutation: {
    newQualifying,
    updateQualifying,
    removeQualifying
  },
  Qualifying: {
    race: joinRace,
    driver: joinDriver,
    constructor: joinConstructor
  }
}
