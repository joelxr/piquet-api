---
to: src/types/<%= name %>/<%= name %>.gpl
---
type <%= h.inflection.capitalize(name) %> {

}

input New<%= h.inflection.capitalize(name) %>Input {

}

input Update<%= h.inflection.capitalize(name) %>Input {

}

extend type Query {
  <%= h.inflection.pluralize(name) %>: [<%= h.inflection.capitalize(name) %>]!
  <%= name %>(id: ID!): <%= h.inflection.capitalize(name) %>!
}

extend type Mutation {
  new<%= h.inflection.capitalize(name) %>(input: New<%= h.inflection.capitalize(name) %>Input!): <%= h.inflection.capitalize(name) %>!
  update<%= h.inflection.capitalize(name) %>(input: Update<%= h.inflection.capitalize(name) %>Input!): <%= h.inflection.capitalize(name) %>!
  remove<%= h.inflection.capitalize(name) %>(id: ID!): <%= h.inflection.capitalize(name) %>!
}
