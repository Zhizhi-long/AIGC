import axios from 'axios'
import { Notify } from 'vant'
import { duration } from '@/configs/noticeConfig'

// const http = axios.create({ baseURL: process.env.NODE_ENV === 'production' ? 'https://lab.cloudlike.cn' : '' })
const http = axios.create({ baseURL: 'https://api.graphygrid.net/' })

function showError (message, className) {
  
}

http.interceptors.response.use(
  (res) => {
    const { code, data } = res.data || {}
    let { message } = res.data || {}
    const { errMsg, noticeClassName } = res.config
    if (errMsg) {
      message = errMsg
    }
    if (code !== 200) {
      showError(message, noticeClassName)
      return Promise.reject(message)
    }
    return data
  },
  (err) => {
    const { message } = err || {}
    const { noticeClassName } = err.config
    showError(message, noticeClassName)
    return Promise.reject(message)
  }
)

const tempA = document.createElement('a')
/**
 * @param {string} url download url
 */
function downloadImage (url) {
  axios({
    url,
    responseType: 'blob'
  }).then(res => {
    const { data } = res
    const mime = data.type
    let suffix = 'jpg'
    if (mime) {
      suffix = mime.split('/')[1]
    }
    tempA.download = `${Date.now()}.${suffix}`
    tempA.href = URL.createObjectURL(data)
    tempA.click()
  })
}

export { http, downloadImage }
