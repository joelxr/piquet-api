import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { DriverStanding } from './driverStanding.model'
import { driver } from '../driver/driver.resolvers'
import { race } from '../race/race.resolvers'

const driverStanding = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return DriverStanding.findOne(args.filter)
    .lean()
    .exec()
}

const newDriverStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return DriverStanding.create({ ...args.input, createdBy: ctx.user._id })
}

export const driverStandings = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = DriverStanding.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateDriverStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return DriverStanding.findOneAndUpdate(
    { driverStandingsId: args.driverStandingsId },
    update,
    { new: true }
  )
    .lean()
    .exec()
}

const removeDriverStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return DriverStanding.findOneAndRemove({
    driverStandingsId: args.driverStandingsId
  })
    .lean()
    .exec()
}

export default {
  Query: {
    driverStandings,
    driverStanding
  },
  Mutation: {
    newDriverStanding,
    updateDriverStanding,
    removeDriverStanding
  },
  DriverStanding: {
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
