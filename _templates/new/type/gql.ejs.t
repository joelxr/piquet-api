---
to: src/types/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.gql
---
type <%= h.inflection.camelize(name) %> {

}

input New<%= h.inflection.camelize(name) %>Input {

}

input Update<%= h.inflection.camelize(name) %>Input {

}

extend type Query {
  <%= h.inflection.pluralize(h.inflection.camelize(name, true)) %>: [<%= h.inflection.camelize(name) %>]!
  <%= h.inflection.camelize(name, true) %>(id: ID!): <%= h.inflection.camelize(name) %>!
}

extend type Mutation {
  new<%= h.inflection.camelize(name) %>(input: New<%= h.inflection.camelize(name) %>Input!): <%= h.inflection.camelize(name) %>!
  update<%= h.inflection.camelize(name) %>(input: Update<%= h.inflection.camelize(name) %>Input!): <%= h.inflection.camelize(name) %>!
  remove<%= h.inflection.camelize(name) %>(id: ID!): <%= h.inflection.camelize(name) %>!
}
