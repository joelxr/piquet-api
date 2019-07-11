import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Status } from './status.model'

const status = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Status.findById(args.id)
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

  return Status.find({})
    .lean()
    .exec()
}

const updateStatus = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Status.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeStatus = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Status.findByIdAndRemove(args.id)
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
