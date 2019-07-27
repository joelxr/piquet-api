import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { LapTime } from './lapTime.model'
import { driver } from '../driver/driver.resolvers'
import { race } from '../race/race.resolvers'
import { LIMIT, SKIP } from '../../utils/queryDefaults'

const lapTime = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return LapTime.findOne(args.filter)
    .lean()
    .exec()
}

const newLapTime = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return LapTime.create({ ...args.input, createdBy: ctx.user._id })
}

export const lapTimes = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = LapTime.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
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
  },
  LapTime: {
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
