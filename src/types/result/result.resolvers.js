import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Result } from './result.model'

const result = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Result.findById(args.id)
    .lean()
    .exec()
}

const newResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Result.create({ ...args.input, createdBy: ctx.user._id })
}

const results = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Result.find({})
    .lean()
    .exec()
}

const updateResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Result.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeResult = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Result.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    results,
    result
  },
  Mutation: {
    newResult,
    updateResult,
    removeResult
  }
}
