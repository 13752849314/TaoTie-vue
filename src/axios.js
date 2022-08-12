import axios from "axios";
import {ElMessage} from "element-plus";
import router from "./router";

// axios.defaults.baseURL = 'http:/127.0.0.1:5000'
// axios.defaults.timeout = 5000

function mes(code, message) {
    return 'code: ' + code.toString() + ' message: ' + message
}

const request = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    baseURL: 'http:/127.0.0.1:5000',
    timeout: 5000
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('jwt')
    return config
})

request.interceptors.response.use(response => {
    let res = response.data
    // console.log('font', res)
    if (res.code === 200) {
        ElMessage({
            showClose: true,
            message: res.message,
            type: 'success'
        })
        return Promise.resolve(response)
    } else {
        ElMessage({
            showClose: true,
            message: mes(res.code, res.message),
            type: 'error'
        })
        return Promise.reject(res)
    }
}, error => {
    if (error.response.data) {
        error.message = error.response.data.message
    }
    if (error.response.status === 401) {
        router.push('/login')
    }
    ElMessage({
        showClose: true,
        message: mes(error.response.status, error.message),
        type: 'error'
    })
    return Promise.reject(error)
})

export default request