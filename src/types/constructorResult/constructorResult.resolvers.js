import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { ConstructorResult } from './constructorResult.model'

const constructorResult = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return ConstructorResult.findById(args.id)
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

  return ConstructorResult.find({})
    .lean()
    .exec()
}

const updateConstructorResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return ConstructorResult.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeConstructorResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return ConstructorResult.findByIdAndRemove(args.id)
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
  }
}
