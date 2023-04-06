import { useAuthContext } from '@asgardeo/auth-react'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { fetchAccessToken, getUserRole } from '../../api/common'
import { useApp } from '../../hooks/useApp'
import { URL_LIST } from '../../links/frontend'
import { Sidebar, TopBar } from '../organisms'

interface IProps {
  children?: React.ReactNode
}

export const Layout: React.FC<IProps> = ({ children }) => {

  const {appState, setAppState} = useApp();
  const {getAccessToken, getBasicUserInfo, signIn, state} = useAuthContext();
  const [idpToken, setIdpToken] = useState<string | null>(null);
  const location = useLocation();
  const history = useHistory();

  if(location.pathname === "/dashboard" && appState.auth.status === "active"){
    history.push(appState.page.redirectURL[appState.auth?.userRole!]);
  }



  useEffect(()=>{
    if (appState.auth.status === "inactive" && state.isAuthenticated) {
      const getToken = async () => {
        const token  = await getAccessToken();
        const userInfo = await getBasicUserInfo();
        const userRole = await getUserRole(userInfo.sub!);
        setIdpToken(token);
        setAppState(prev => ({...prev, auth:{...prev.auth, userID: userInfo.sub, userRole}}))
        return;
      }

      if(idpToken !== null){
        fetchAccessToken(idpToken, setAppState, signIn);
      }else{
        getToken();
      }
    }
  }, [appState.auth.status, state.isAuthenticated, idpToken])

  return (
    <>
      {
        appState.auth.status === "active" && (
          <>
        <main style={{ display: 'flex', flexDirection: 'row' }}>
            <Box
                sx={{
                width: { lg: '20%', xs: 'auto' },
                maxWidth: '20%',
                height: '100vh',
                zIndex: '50',
                }}
            >
                <Sidebar />
            </Box>
            <section style={{ width: '80%', maxWidth: '80%' }}>
                <TopBar />
                <Box marginX="4rem">
                  {children}
                </Box>
            </section>
        </main>
    </>
        )
      }
    </>
  )
}