---
inject: true
to: src/server.js
after: const types
---
  '<%= h.inflection.camelize(name, true) %>',