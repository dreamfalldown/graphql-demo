// 保证类型反射(必须在第一行引入)
import 'reflect-metadata';
import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import db from './model/index'
import { auth } from './middleware/auth'
import { getSchema } from './grapql/index'
import config from './config/config'

(async () => {
  const app = new Koa()
  db.connect()

  if (config.mode === 'prod') {
    app.use(auth)
  }

  const server = new ApolloServer({
    schema: await getSchema()
  })
  server.applyMiddleware({ app })
  app.listen({ port: 8080 }, () =>
    console.log('server start on http://localhost:8080')
  )
})()

