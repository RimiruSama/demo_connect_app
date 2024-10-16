import axios from 'axios'
import { HOST_API } from '../config'
import { toQueryString } from './index'

const axiosInstance = axios.create({
  baseURL: HOST_API,
  paramsSerializer: (param) => toQueryString(param)
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(async (config) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers = {
      ...config.headers
    }
  } catch (e) {
    console.log(e)
  }

  return {
    ...config
  }
})

export default axiosInstance
