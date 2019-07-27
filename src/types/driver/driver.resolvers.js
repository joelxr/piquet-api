import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Driver } from './driver.model'
import { qualifyings } from '../qualifying/qualifying.resolvers'
import { lapTimes } from '../lapTime/lapTime.resolvers'
import { results } from '../result/result.resolvers'
import { pitStops } from '../pitStop/pitStop.resolvers'
import { driverStandings } from '../driverStanding/driverStanding.resolvers'

export const driver = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Driver.findOne(args.filter)
    .lean()
    .exec()
}

const newDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Driver.create({ ...args.input, createdBy: ctx.user._id })
}

const drivers = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Driver.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Driver.findOneAndUpdate({ driverId: args.driverId }, update, {
    new: true
  })
    .lean()
    .exec()
}

const removeDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Driver.findOneAndRemove({ driverId: args.driverId })
    .lean()
    .exec()
}

export default {
  Query: {
    drivers,
    driver
  },
  Mutation: {
    newDriver,
    updateDriver,
    removeDriver
  },
  Driver: {
    driverStandings(_, args, ctx) {
      return driverStandings.call(
        this,
        _,
        {
          skip: args.skip,
          limit: args.limit,
          filter: { driverId: _.driverId, ...args.filter }
        },
        ctx
      )
    },
    qualifyings(_, args, ctx) {
      return qualifyings.call(
        this,
        _,
        {
          skip: args.skip,
          limit: args.limit,
          filter: { driverId: _.driverId, ...args.filter }
        },
        ctx
      )
    },
    lapTimes(_, args, ctx) {
      return lapTimes.call(
        this,
        _,
        {
          skip: args.skip,
          limit: args.limit,
          filter: { raceId: _.raceId, ...args.filter }
        },
        ctx
      )
    },
    pitStops(_, args, ctx) {
      return pitStops.call(
        this,
        _,
        {
          skip: args.skip,
          limit: args.limit,
          filter: { raceId: _.raceId, ...args.filter }
        },
        ctx
      )
    },
    results(_, args, ctx) {
      return results.call(
        this,
        _,
        {
          skip: args.skip,
          limit: args.limit,
          filter: { raceId: _.raceId, ...args.filter }
        },
        ctx
      )
    }
  }
}
