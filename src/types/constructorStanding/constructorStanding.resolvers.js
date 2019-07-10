import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { ConstructorStanding } from './constructorStanding.model'

const constructorStanding = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return ConstructorStanding.findById(args.id)
    .lean()
    .exec()
}

const newConstructorStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return ConstructorStanding.create({ ...args.input, createdBy: ctx.user._id })
}

const constructorStandings = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return ConstructorStanding.find({})
    .lean()
    .exec()
}

const updateConstructorStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return ConstructorStanding.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeConstructorStanding = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return ConstructorStanding.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    constructorStandings,
    constructorStanding
  },
  Mutation: {
    newConstructorStanding,
    updateConstructorStanding,
    removeConstructorStanding
  }
}
