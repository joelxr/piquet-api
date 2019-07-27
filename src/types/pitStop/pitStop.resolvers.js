import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { PitStop } from './pitStop.model'
import { driver } from '../driver/driver.resolvers'
import { race } from '../race/race.resolvers'

const pitStop = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return PitStop.findOne(args.filter)
    .lean()
    .exec()
}

const newPitStop = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return PitStop.create({ ...args.input, createdBy: ctx.user._id })
}

export const pitStops = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = PitStop.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updatePitStop = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return PitStop.findOneAndUpdate(
    { raceId: args.raceId, driverId: args.driverId },
    update,
    { new: true }
  )
    .lean()
    .exec()
}

const removePitStop = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const { raceId, driverId, stop } = args

  return PitStop.findOneAndRemove({
    raceId,
    driverId,
    stop
  })
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
  },
  PitStop: {
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
    }
  }
}
