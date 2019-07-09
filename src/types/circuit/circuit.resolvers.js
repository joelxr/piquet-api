import { Circuit } from './circuit.model'
import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'

const circuit = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return Circuit.findById(args.id)
    .lean()
    .exec()
}

const newCircuit = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Circuit.create({ ...args.input, createdBy: ctx.user._id })
}

const circuits = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Circuit.find({})
    .lean()
    .exec()
}

const updateCircuit = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return Circuit.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeCircuit = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return Circuit.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    circuits,
    circuit
  },
  Mutation: {
    newCircuit,
    updateCircuit,
    removeCircuit
  }
}
