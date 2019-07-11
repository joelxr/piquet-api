import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Constructor } from './constructor.model'

const constructor = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Constructor.findById(args.id)
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

  return Constructor.find({})
    .lean()
    .exec()
}

const updateConstructor = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Constructor.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeConstructor = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Constructor.findByIdAndRemove(args.id)
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
