import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.pathname = '/login'
    }
    return Promise.reject(error)
  }
)
