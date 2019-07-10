---
to: src/types/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.resolvers.js
---
import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { <%= h.inflection.camelize(name) %> } from './<%= h.inflection.camelize(name, true) %>.model'

const <%= h.inflection.camelize(name, true) %> = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return <%= h.inflection.camelize(name) %>.findById(args.id)
    .lean()
    .exec()
}

const new<%= h.inflection.camelize(name) %> = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return <%= h.inflection.camelize(name) %>.create({ ...args.input, createdBy: ctx.user._id })
}

const <%= h.inflection.pluralize(h.inflection.camelize(name, true)) %> = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return <%= h.inflection.camelize(name) %>.find({})
    .lean()
    .exec()
}

const update<%= h.inflection.camelize(name) %> = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return <%= h.inflection.camelize(name) %>.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const remove<%= h.inflection.camelize(name) %> = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return <%= h.inflection.camelize(name) %>.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    <%= h.inflection.pluralize(h.inflection.camelize(name, true)) %>,
    <%= h.inflection.camelize(name, true) %>
  },
  Mutation: {
    new<%= h.inflection.camelize(name) %>,
    update<%= h.inflection.camelize(name) %>,
    remove<%= h.inflection.camelize(name) %>
  }
}
