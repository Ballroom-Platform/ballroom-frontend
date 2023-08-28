import { useAuthContext } from '@asgardeo/auth-react';
import { useApp } from './useApp'

const useRefreshToken = () => {
  const {refreshAccessToken } = useAuthContext();
  const { setAppState} = useApp();

  const refresh = async () => {
    var accessToken = "";
    refreshAccessToken().then(async (res) => {
      setAppState(prev => ({...prev, auth: {...prev.auth, accessToken: res.accessToken}}))
      accessToken = res.accessToken
    }).catch((error) => {
      console.log(error);
    });
    return accessToken
  }
  return refresh
}

export default useRefreshToken