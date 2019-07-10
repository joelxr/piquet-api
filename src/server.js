import { ApolloServer } from 'apollo-server'
import { loadTypeSchema } from './utils/schema'
import { authenticate } from './utils/auth'
import { merge } from 'lodash'
import config from './config'
import { connect } from './db'
import constructorStanding from './types/constructorStanding/constructorStanding.resolvers'
import constructorResult from './types/constructorResult/constructorResult.resolvers'
import circuit from './types/circuit/circuit.resolvers'
import driver from './types/driver/driver.resolvers'
import user from './types/user/user.resolvers'

const types = [
  'constructorStanding',
  'constructorResult',
  'driver',
  'circuit',
  'user'
]

export const start = async () => {
  const rootSchema = `
    scalar Date

    schema {
      query: Query,
      mutation: Mutation
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({},
      constructorStanding,
      constructorResult,
      driver,
      circuit,
      user
    ),
    async context({ req }) {
      const user = await authenticate(req)
      return { user }
    }
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: config.port })

  console.log(`GQL server ready at ${url}`)
}
