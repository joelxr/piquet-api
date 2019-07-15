import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { LapTime } from './lapTime.model'
import { joinDriver } from '../driver/driver.resolvers'
import { joinRace } from '../race/race.resolvers'
import { LIMIT, SKIP } from '../../utils/queryDefaults'

const lapTime = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return LapTime.findOne({
    raceId: args.raceId,
    driverId: args.driverId,
    lap: args.lap
  })
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
    race: joinRace,
    driver: joinDriver
  }
}
