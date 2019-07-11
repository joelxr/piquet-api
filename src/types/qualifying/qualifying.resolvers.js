import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Qualifying } from './qualifying.model'

const qualifying = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Qualifying.findById(args.id)
    .lean()
    .exec()
}

const newQualifying = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Qualifying.create({ ...args.input, createdBy: ctx.user._id })
}

const qualifyings = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Qualifying.find({})
    .lean()
    .exec()
}

const updateQualifying = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Qualifying.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeQualifying = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Qualifying.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    qualifyings,
    qualifying
  },
  Mutation: {
    newQualifying,
    updateQualifying,
    removeQualifying
  }
}
