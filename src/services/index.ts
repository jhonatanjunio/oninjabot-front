import Http from './Http'

export const httpService = new Http({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: Number(import.meta.env.VITE_TIMEOUT),
})