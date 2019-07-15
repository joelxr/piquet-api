import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Status } from './status.model'

const status = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Status.findOne({ statusId: args.statusId })
    .lean()
    .exec()
}

const newStatus = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Status.create({ ...args.input, createdBy: ctx.user._id })
}

const statuses = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Status.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateStatus = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Status.findOneAndUpdate({ statusId: args.statusId }, update, {
    new: true
  })
    .lean()
    .exec()
}

const removeStatus = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Status.findOneAndRemove({ statusId: args.statusId })
    .lean()
    .exec()
}

export default {
  Query: {
    statuses,
    status
  },
  Mutation: {
    newStatus,
    updateStatus,
    removeStatus
  }
}
