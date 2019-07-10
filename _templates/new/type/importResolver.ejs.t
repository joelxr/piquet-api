---
inject: true
to: src/server.js
after: import { connect } from './db'
---
import <%= h.inflection.camelize(name, true) %> from './types/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.resolvers'