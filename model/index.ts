import mongoose from 'mongoose'
import config from '../config/config'

let connect = () => {
    let { username, password, host, port, database } = config
    let url = `mongodb://${username}:${password}@${host}:${port}/${database}`
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('mongoose connect success')
    }).catch((err: Error) => {
        console.log(err)
    })
}

export default {
    connect
}
