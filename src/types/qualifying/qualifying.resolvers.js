import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Qualifying } from './qualifying.model'
import { driver } from '../driver/driver.resolvers'
import { race } from '../race/race.resolvers'
import { constructor } from '../constructor/constructor.resolvers'

const qualifying = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Qualifying.findOne(args.filter)
    .lean()
    .exec()
}

const newQualifying = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Qualifying.create({ ...args.input, createdBy: ctx.user._id })
}

export const qualifyings = (_, args, ctx) => {
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
    driver(_, args, ctx) {
      return driver.call(
        this,
        _,
        { filter: { driverId: _.driverId, ...args.filter } },
        ctx
      )
    },
    race(_, args, ctx) {
      return race.call(
        this,
        _,
        { filter: { raceId: _.raceId, ...args.filter } },
        ctx
      )
    },
    constructor(_, args, ctx) {
      return constructor.call(
        this,
        _,
        { filter: { constructorId: _.constructorId, ...args.filter } },
        ctx
      )
    }
  }
}
