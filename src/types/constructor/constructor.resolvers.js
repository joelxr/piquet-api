import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Constructor } from './constructor.model'
import { LIMIT, SKIP } from '../../utils/queryDefaults'
import { qualifyings } from '../qualifying/qualifying.resolvers'
import { pitStops } from '../pitStop/pitStop.resolvers'
import { results } from '../result/result.resolvers'
import { constructorStandings } from '../constructorStanding/constructorStanding.resolvers'
import { constructorResults } from '../constructorResult/constructorResult.resolvers'

export const constructor = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Constructor.findOne(args.filter)
    .lean()
    .exec()
}

const newConstructor = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Constructor.create({ ...args.input, createdBy: ctx.user._id })
}

const constructors = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Constructor.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateConstructor = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Constructor.findOneAndUpdate(
    { constructorId: args.constructorId },
    update,
    { new: true }
  )
    .lean()
    .exec()
}

const removeConstructor = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Constructor.findOneAndRemove({ constructorId: args.constructorId })
    .lean()
    .exec()
}

export default {
  Query: {
    constructors,
    constructor
  },
  Mutation: {
    newConstructor,
    updateConstructor,
    removeConstructor
  },
  Constructor: {
    constructorResults(_, args, ctx) {
      return constructorResults.call(
        this,
        _,

        {
          skip: args.skip,
          limit: args.limit,
          filter: { constructorId: _.constructorId, ...args.filter }
        },
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
          filter: { constructorId: _.constructorId, ...args.filter }
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
          filter: { constructorId: _.constructorId, ...args.filter }
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
          filter: { constructorId: _.constructorId, ...args.filter }
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
          filter: { constructorId: _.constructorId, ...args.filter }
        },
        ctx
      )
    }
  }
}
