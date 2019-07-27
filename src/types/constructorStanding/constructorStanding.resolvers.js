import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { ConstructorStanding } from './constructorStanding.model'
import { race } from '../race/race.resolvers'
import { constructor } from '../constructor/constructor.resolvers'
import { LIMIT, SKIP } from '../../utils/queryDefaults'

const constructorStanding = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return ConstructorStanding.findOne(args.filter)
    .lean()
    .exec()
}

const newConstructorStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return ConstructorStanding.create({ ...args.input, createdBy: ctx.user._id })
}

export const constructorStandings = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = ConstructorStanding.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateConstructorStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return ConstructorStanding.findOneAndUpdate(
    { constructorStandingsId: args.constructorStandingsId },
    update,
    { new: true }
  )
    .lean()
    .exec()
}

const removeConstructorStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return ConstructorStanding.findOneAndRemove({
    constructorStandingsId: args.constructorStandingsId
  })
    .lean()
    .exec()
}

export default {
  Query: {
    constructorStandings,
    constructorStanding
  },
  Mutation: {
    newConstructorStanding,
    updateConstructorStanding,
    removeConstructorStanding
  },
  ConstructorStanding: {
    race(_, args, ctx) {
      return race.call(
        this,
        _,
        { filter: { raceId: _.raceId, ...args.filter } },
        ctx
      )
    },
    constructor(_, args, ctx) {
      return constructor.call(
        this,
        _,
        { filter: { constructorId: _.constructorId, ...args.filter } },
        ctx
      )
    }
  }
}
