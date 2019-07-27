import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Result } from './result.model'
import { driver } from '../driver/driver.resolvers'
import { race } from '../race/race.resolvers'
import { constructor } from '../constructor/constructor.resolvers'

const result = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Result.findOne(args.filter)
    .lean()
    .exec()
}

const newResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Result.create({ ...args.input, createdBy: ctx.user._id })
}

export const results = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Result.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Result.findOneAndUpdate({ resultId: args.resultId }, update, {
    new: true
  })
    .lean()
    .exec()
}

const removeResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Result.findOneAndRemove({ resultId: args.resultId })
    .lean()
    .exec()
}

export default {
  Query: {
    results,
    result
  },
  Mutation: {
    newResult,
    updateResult,
    removeResult
  },
  Result: {
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
