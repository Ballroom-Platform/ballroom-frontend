import axios from '../api/axios'
import { STS_URLS } from '../links/backend';
import { useApp } from './useApp'

const useRefreshToken = () => {
  const { setAppState} = useApp();

  const refresh = async () => {
    const response = await axios.get(STS_URLS.refreshToken, { withCredentials: true })
    setAppState(prev => ({...prev, auth: {...prev.auth, accessToken : response.data.accessToken}}))
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken