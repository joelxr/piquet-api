---
inject: true
to: src/server.js
after: import { connect } from './db'
---
import <%= name %> from './types/<%= name %>/<%= name %>.resolvers'