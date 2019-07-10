---
inject: true
to: src/server.js
after: 'resolvers: merge'
---
      <%= h.inflection.camelize(name, true) %>,