import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { PitStop } from './pitStop.model'
import { joinDriver } from '../driver/driver.resolvers'
import { joinRace } from '../race/race.resolvers'

const pitStop = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const { raceId, driverId, stop } = args

  return PitStop.findOne({
    raceId,
    driverId,
    stop
  })
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
    race: joinRace,
    driver: joinDriver
  }
}
