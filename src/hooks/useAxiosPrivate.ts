import { useEffect } from 'react'
import { axiosPrivate } from '../api/axios'
import { useApp } from './useApp'
import useRefreshToken from './useRefreshToken'

const useAxiosPrivate = async () => {
    const {appState} = useApp();
    const refresh = useRefreshToken();
    let accessToken = appState.auth.accessToken;

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
            accessToken = await refresh();
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