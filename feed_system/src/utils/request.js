import axios from 'axios'
import { getToken, removeToken, setLoginStatus } from './token'
import { Message } from 'element-ui'

const CancelToken = axios.CancelToken
let source = CancelToken.source()
let filename = ''
const baseURL = process.env.NODE_ENV === 'development' ? '/feedSystem' : '/feedSystem'
// 创建实例
const service = axios.create({
  baseURL,
  timeout: 25000
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截， 通过code及http状态码判断是否请求成功
service.interceptors.response.use((response) => {
  // console.log(response.data.code)
  // console.log(response)
  const param = 'content-disposition'
  if (response.headers && response.headers[param]) {
    debugger
    filename = response.headers[param].split('=')[1]
  }
  if (+response.data.code === 401) {
    this.$router.push({
      path: '/login'
    })
    alert(response.data.msg)
    console.log('token失效')
    setLoginStatus(false)
    removeToken()
  }
  return response.data
}, (error) => {
  if (+error.response.status >= 300) {
    Message.error(error.response.data?.msg || '请求出错了')
    throw error
  }
})
function requestByGet (url, params) {
  return service({
    method: 'get',
    headers: {
      token: getToken()
    },
    url,
    params: { ...params }
  })
}
function requestByPost (url, body) {
  return service({
    method: 'post',
    headers: {
      token: getToken()
    },
    url,
    data: body
  })
}
function requestByPut (url, body) {
  return service({
    method: 'put',
    url,
    headers: {
      token: getToken()
    },
    data: body
  })
}
function requestByDelete (url, body) {
  return service({
    method: 'delete',
    url,
    headers: {
      token: getToken()
    },
    data: body
  })
}
function requestBydownload (url, params) {
  return service({
    method: 'get',
    url,
    headers: {
      token: getToken()
    },
    params: { ...params },
    responseType: 'arraybuffer'
  }).then((res) => {
    debugger
    console.log(filename)
    const blob = new Blob([res], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    })
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      const downloadElement = document.createElement('a')
      const downloadUrl = window.URL.createObjectURL(blob)
      filename = decodeURIComponent(filename)
      downloadElement.href = downloadUrl
      downloadElement.download = filename
      document.body.appendChild(downloadElement)
      downloadElement.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 0)
    }
  })
}
const cancelRequest = () => {
  source.cancel('')
  source = CancelToken.source()
}
export { cancelRequest, requestByGet, requestByPost, baseURL, requestByPut, requestByDelete, requestBydownload }
