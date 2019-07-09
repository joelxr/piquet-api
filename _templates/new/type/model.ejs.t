---
to: src/types/<%= name %>/<%= name %>.model.js
---
import mongoose from 'mongoose'

const <%= name %>Schema = new mongoose.Schema({
  
})

export const <%= h.inflection.capitalize(name) %> = mongoose.model('<%= name %>', <%= name %>Schema)
