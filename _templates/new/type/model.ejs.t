---
to: src/types/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.model.js
---
import mongoose from 'mongoose'

const <%= h.inflection.camelize(name, true) %>Schema = new mongoose.Schema({
  
})

export const <%= h.inflection.camelize(name) %> = mongoose.model('<%= name %>', <%= h.inflection.camelize(name, true) %>Schema)
