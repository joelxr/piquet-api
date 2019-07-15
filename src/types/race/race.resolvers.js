import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Race } from './race.model'
import { joinCircuit } from '../circuit/circuit.resolvers'

const race = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Race.findOne({ raceId: args.raceId })
    .lean()
    .exec()
}

const newRace = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Race.create({ ...args.input, createdBy: ctx.user._id })
}

const races = (_, args, ctx) => {
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

export const joinRace = (_, args, ctx) => {
  return Race.findOne({ raceId: _.raceId })
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
    circuit: joinCircuit
  }
}
