import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 👉 REQUEST INTERCEPTOR (inject token)
api.interceptors.request.use(
    async (config) => {
        if (typeof window !== 'undefined') {
            const session = await getSession()
            if (session?.user?.tokenData?.accessToken) {
                config.headers.Authorization = `Bearer ${session?.user?.tokenData?.accessToken}`
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 👉 RESPONSE INTERCEPTOR (handle error 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== 'undefined') {
            const status = error.response?.status

            if (status === 401) {
                // hapus token
                localStorage.removeItem('token')

                // hindari redirect loop
                if (window.location.pathname !== '/login') {
                    console.log("routing dlu ke login");
                    debugger
                    window.location.href = '/login'
                }
            }
        }

        return Promise.reject(error)
    }
)

export default api