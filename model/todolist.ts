import { prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class List {
    @Field({ description: 'id' })
    public _id?: string

    @prop({ required: true })
    @Field({ description: '标题' })
    public title!: string

    @prop({ default: false })
    @Field({ description: '状态' })
    public state!: boolean
}

export const ListModel = getModelForClass(List)