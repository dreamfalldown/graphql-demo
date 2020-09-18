import config from '../config/config'
import mongoose from 'mongoose'
import { AxiosResponse } from 'axios'
import axios from '../util/axios'
import { List } from '../model/todolist'

interface IList {
    list: List
}
interface ILists {
    lists: List[]
}
interface IsOk {
    isOk: boolean
}

const { username, password, host, port, database } = config
const url = `mongodb://${username}:${password}@${host}:${port}/${database}`
let insertData: List

describe('test todolist crud', () => {
    beforeAll(async () => {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    })

    it('get lists is ok', async () => {
        let res: AxiosResponse<ILists> = await axios.post('/graphql', {
            operationName: "getAll",
            query: `
                query getAll {
                    lists: getLists {
                        _id,
                        title,
                        state
                    }
                }
            `
        })

        expect(res.data.lists).toBeTruthy()
    })

    it('insert list is ok', async () => {
        let res: AxiosResponse<IList> = await axios.post('/graphql', {
            operationName: 'insertOne',
            query: `
                mutation insertOne {
                    list: insertOne(data: {
                        title: "打豆豆",
                        state: false
                    }) {
                        _id,
                        title,
                        state
                    }
                }
            `
        })

        insertData = res.data.list
        expect(insertData).toBeTruthy()
    })

    it('update list is ok', async () => {
        let res: AxiosResponse<IsOk> = await axios.post('/graphql', {
            operationName: "updateOne",
            query: `
                mutation updateOne {
                    isOk: updateOne(
                        id: "${insertData._id}", 
                        state: true
                    ) 
                }
            `
        })

        expect(res.data.isOk).toBeTruthy()
    })

    it('delete list is ok', async () => {
        let res: AxiosResponse<IsOk> = await axios.post('/graphql', {
            operationName: "deleteOne",
            query: `
                mutation deleteOne {
                    isOk: deleteOne(
                        id: "${insertData._id}"
                    ) 
                }
            `
        })

        expect(res.data.isOk).toBeTruthy()
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})