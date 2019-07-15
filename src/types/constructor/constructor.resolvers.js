import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Constructor } from './constructor.model'
import { LIMIT, SKIP } from '../../utils/queryDefaults'

const constructor = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Constructor.findOne({ constructorId: args.constructorId })
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

export const joinConstructor = (_, args, ctx) => {
  return Constructor.findOne({ constructorId: _.constructorId })
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
  }
}
