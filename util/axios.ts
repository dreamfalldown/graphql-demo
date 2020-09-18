import axios, { AxiosResponse } from 'axios'

let myAxios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        auth: 'daslbdas'
    }
})

myAxios.interceptors.response.use((res: AxiosResponse) => {
    if (res) {
        return res.data
    }
}, (error: any) => {
    console.log(error.response.data.errors)
    return Promise.reject(error)
})

export default myAxios