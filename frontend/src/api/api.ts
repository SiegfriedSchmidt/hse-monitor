import axios, {AxiosError, AxiosRequestConfig} from "axios";

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

export const api = {
  get: async (url: string, config?: AxiosRequestConfig<any> | undefined): Promise<{
    status: 'success' | 'warning' | 'error',
    content: any
  }> => {
    try {
      const rs = await axiosInstance.get(url, config)
      if (rs.data.status === 'success' || rs.data.status === 'warning' || rs.data.status === 'error') {
        return {status: rs.data.status, content: rs.data.content}
      } else {
        return {status: "error", content: 'Неизвестная ошибка'}
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        return {
          status: "error",
          content: err.response.data.detail,
        }
      } else {
        throw err
      }
    }
  },
  post: async (url: string, data?: object, config?: AxiosRequestConfig<any> | undefined): Promise<{
    status: 'success' | 'warning' | 'error',
    content: any
  }> => {
    try {
      const rs = await axiosInstance.post(url, data, config)
      if (rs.data.status === 'success' || rs.data.status === 'warning' || rs.data.status === 'error') {
        return {status: rs.data.status, content: rs.data.content}
      } else {
        return {status: "error", content: 'Неизвестная ошибка'}
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        console.log(err.response)
        return {
          status: "error",
          content: err.response.statusText,
        }
      } else {
        throw err
      }
    }
  }
}