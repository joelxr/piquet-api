import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { Driver } from './driver.model'

const driver = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Driver.findById(args.id)
    .lean()
    .exec()
}

const newDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Driver.create({ ...args.input, createdBy: ctx.user._id })
}

const drivers = (_, args, ctx) => {
  console.log(1)
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Driver.find({})
    .lean()
    .exec()
}

const updateDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Driver.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Driver.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    drivers,
    driver
  },
  Mutation: {
    newDriver,
    updateDriver,
    removeDriver
  }
}
