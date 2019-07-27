import { Circuit } from './circuit.model'
import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { LIMIT, SKIP } from '../../utils/queryDefaults'
import { races } from '../race/race.resolvers'

export const circuit = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Circuit.findOne(args.filter)
    .lean()
    .exec()
}

const newCircuit = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Circuit.create({ ...args.input, createdBy: ctx.user._id })
}

const circuits = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Circuit.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateCircuit = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Circuit.findOneAndUpdate({ circuitId: args.circuitId }, update, {
    new: true
  })
    .lean()
    .exec()
}

const removeCircuit = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Circuit.findOneAndRemove({ circuitId: args.circuitId })
    .lean()
    .exec()
}

export default {
  Query: {
    circuits,
    circuit
  },
  Mutation: {
    newCircuit,
    updateCircuit,
    removeCircuit
  },
  Circuit: {
    races(_, args, ctx) {
      return races.call(
        this,
        _,
        { filter: { circuitId: _.circuitId, ...args.filter } },
        ctx
      )
    }
  }
}
