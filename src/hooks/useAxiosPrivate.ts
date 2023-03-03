import { useAuthContext } from '@asgardeo/auth-react'
import { useEffect } from 'react'
import { axiosPrivate } from '../api/axios'

const useAxiosPrivate = async () => {
    const {getAccessToken, refreshAccessToken} = useAuthContext()
    let accessToken = await getAccessToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
            if (config && config?.headers && !config?.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
            }
            return config
        },
        (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const prevRequest = error?.config
            if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true
            await refreshAccessToken();
            accessToken = await getAccessToken();
            prevRequest.headers['Authorization'] = `Bearer ${accessToken}`
            return axiosPrivate(prevRequest)
            }
            return Promise.reject(error)
        }
        )

        return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept)
        axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [])

    return axiosPrivate
}

export default useAxiosPrivate