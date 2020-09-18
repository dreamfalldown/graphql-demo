import { buildSchema } from 'type-graphql'
import { ListResolver } from './resolves/todolist'

export async function getSchema() {
    return await buildSchema({
        resolvers: [
            ListResolver
        ]
    })
}

