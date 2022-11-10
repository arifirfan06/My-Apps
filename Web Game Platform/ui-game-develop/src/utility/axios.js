import axios from 'axios'
import { get } from 'lodash'
import Cookies from 'js-cookie'
import { API_URL, NODE_ENV } from './env'
axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.timeout = 180000 // 30 seconds
axios.interceptors.request.use(
  async (response) => {
    const originalConfig = response
    const cookie = await Cookies.get('_q')
    const userToken = cookie !== undefined ? JSON.parse(cookie) : null
    if (userToken) {
      originalConfig.headers.Authorization = `Bearer ${userToken?.access_token}`
    }
    originalConfig.headers['Access-Control-Allow-Origin'] = '*'
    originalConfig.headers.Accept = 'application/json'
    originalConfig.headers['Content-Type'] = 'application/json; charset=utf-8'

    if (NODE_ENV === 'development') {
      // console.log('[request] >>>', response)
    }

    return originalConfig
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (NODE_ENV === 'development') {
      console.log(`error at ${error.config.url}`);
      console.log(error);
      console.log(error.response);
    }

    if (
      get(error, 'response.data.code', '') === '401' ||
      get(error, 'response.data.message', '') === 'Unauthorized'
    ) {
      Cookies.remove('_q')
      window.location.reload()
    }
    return Promise.reject(error)
  },
)

export default axios
