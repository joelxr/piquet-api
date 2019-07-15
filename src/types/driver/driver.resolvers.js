import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { SKIP, LIMIT } from '../../utils/queryDefaults'
import { Driver } from './driver.model'

const driver = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Driver.findOne({ driverId: args.driverId })
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
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  const query = Driver.find(args.filter)
  query.limit(args.limit || LIMIT)
  query.skip(args.skip || SKIP)
  return query.lean().exec()
}

const updateDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Driver.findOneAndUpdate({ driverId: args.driverId }, update, {
    new: true
  })
    .lean()
    .exec()
}

const removeDriver = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Driver.findOneAndRemove({ driverId: args.driverId })
    .lean()
    .exec()
}

export const joinDriver = async (_, args, ctx) => {
  return Driver.findOne({ driverId: _.driverId })
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
