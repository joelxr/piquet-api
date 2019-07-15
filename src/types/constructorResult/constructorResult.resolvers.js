import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { ConstructorResult } from './constructorResult.model'
import { joinRace } from '../race/race.resolvers'
import { joinConstructor } from '../constructor/constructor.resolvers'
import { LIMIT, SKIP } from '../../utils/queryDefaults'

const constructorResult = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return ConstructorResult.findOne({
    constructorResultsId: args.constructorResultsId
  })
    .lean()
    .exec()
}

const newConstructorResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return ConstructorResult.create({ ...args.input, createdBy: ctx.user._id })
}

const constructorResults = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = ConstructorResult.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateConstructorResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return ConstructorResult.findOneAndUpdate(
    { constructorResultsId: args.constructorResultsId },
    update,
    { new: true }
  )
    .lean()
    .exec()
}

const removeConstructorResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return ConstructorResult.findOneAndRemove({
    constructorResultsId: args.constructorResultsId
  })
    .lean()
    .exec()
}

export default {
  Query: {
    constructorResults,
    constructorResult
  },
  Mutation: {
    newConstructorResult,
    updateConstructorResult,
    removeConstructorResult
  },
  ConstructorResult: {
    race: joinRace,
    constructor: joinConstructor
  }
}
