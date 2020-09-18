import { InputType, Field, Resolver, Query, Mutation, Arg } from 'type-graphql'
import { List, ListModel } from '../../model/todolist'

@InputType()
class ListInput implements Partial<List> {
    @Field({ description: '标题' })
    public title!: string

    @Field({ description: '状态' })
    public state: boolean = false
}

@Resolver(List)
export class ListResolver {
    @Query(() => [List], {})
    async getLists() {
        return ListModel.find({})
    }

    @Mutation(() => List)
    async insertOne(@Arg('data') data: ListInput) {
        const list = await ListModel.create(data)
        return list
    }

    @Mutation(() => Boolean)
    async deleteOne(@Arg('id') id: string) {
        const res = await ListModel.deleteOne({
            _id: id
        })
        if (res.deletedCount) {
            return true
        }
        return false
    }

    @Mutation(() => Boolean)
    async updateOne(
        @Arg('id') id: string,
        @Arg('state') state: boolean
    ) {
        const res = await ListModel.updateOne({
            _id: id
        }, {
            state
        })
        if (res.ok) {
            return true
        }
        return false
    }
}
