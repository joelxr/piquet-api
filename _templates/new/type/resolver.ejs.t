---
to: src/types/<%= name %>/<%= name %>.resolvers.js
---
import { AuthenticationError } from 'apollo-server'
import { roles } from '../../utils/auth'
import { <%= h.inflection.capitalize(name) %> } from './<%= name %>.model'

const <%= name %> = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return <%= h.inflection.capitalize(name) %>.findById(args.id)
    .lean()
    .exec()
}

const new<%= h.inflection.capitalize(name) %> = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return <%= h.inflection.capitalize(name) %>.create({ ...args.input, createdBy: ctx.user._id })
}

const <%= h.inflection.pluralize(name) %> = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return <%= h.inflection.capitalize(name) %>.find({})
    .lean()
    .exec()
}

const update<%= h.inflection.capitalize(name) %> = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  const update = args.input
  return <%= h.inflection.capitalize(name) %>.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const remove<%= h.inflection.capitalize(name) %> = (_, args, ctx) => {
  if (!ctx.user || ctx.user.role !== roles.admin) {
    throw new AuthenticationError()
  }

  return <%= h.inflection.capitalize(name) %>.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    <%= h.inflection.pluralize(name) %>,
    <%= name %>
  },
  Mutation: {
    new<%= h.inflection.capitalize(name) %>,
    update<%= h.inflection.capitalize(name) %>,
    remove<%= h.inflection.capitalize(name) %>
  }
}
