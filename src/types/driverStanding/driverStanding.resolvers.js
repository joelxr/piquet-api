import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { DriverStanding } from './driverStanding.model'

const driverStanding = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return DriverStanding.findById(args.id)
    .lean()
    .exec()
}

const newDriverStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return DriverStanding.create({ ...args.input, createdBy: ctx.user._id })
}

const driverStandings = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return DriverStanding.find({})
    .lean()
    .exec()
}

const updateDriverStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return DriverStanding.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeDriverStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return DriverStanding.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    driverStandings,
    driverStanding
  },
  Mutation: {
    newDriverStanding,
    updateDriverStanding,
    removeDriverStanding
  }
}
