import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Race } from './race.model'
import { circuit } from '../circuit/circuit.resolvers'
import { constructorStandings } from '../constructorStanding/constructorStanding.resolvers'
import { driverStandings } from '../driverStanding/driverStanding.resolvers'
import { qualifyings } from '../qualifying/qualifying.resolvers'
import { lapTimes } from '../lapTime/lapTime.resolvers'
import { results } from '../result/result.resolvers'
import { pitStops } from '../pitStop/pitStop.resolvers'

export const race = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Race.findOne(args.filter)
    .lean()
    .exec()
}

const newRace = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Race.create({ ...args.input, createdBy: ctx.user._id })
}

export const races = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Race.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateRace = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Race.findOneAndUpdate({ raceId: args.raceId }, update, { new: true })
    .lean()
    .exec()
}

const removeRace = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Race.findOneAndRemove({ raceId: args.raceId })
    .lean()
    .exec()
}

export default {
  Query: {
    races,
    race
  },
  Mutation: {
    newRace,
    updateRace,
    removeRace
  },
  Race: {
    circuit(_, args, ctx) {
      return circuit.call(
        this,
        _,
        { filter: { circuitId: _.circuitId, ...args.filter } },
        ctx
      )
    },
    constructorStandings(_, args, ctx) {
      return constructorStandings.call(
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
    driverStandings(_, args, ctx) {
      return driverStandings.call(
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
    qualifyings(_, args, ctx) {
      return qualifyings.call(
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
