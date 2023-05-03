import React, { useEffect, useState } from "react";
import { useApp } from "../../hooks/useApp"
import { TRole } from "../../helpers/interfaces";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "@asgardeo/auth-react";
import { fetchAccessToken, getUserRole } from "../../api/common";
import { Unauthorized } from "../../pages/Unauthorized";

interface IProps {
    allowedRoles : Array<TRole>;
}

export const RequireAuth : React.FC<IProps> = ({allowedRoles}) => {
    const {appState, setAppState} = useApp();
    const {getAccessToken, getBasicUserInfo, signOut, state} = useAuthContext();
    const [idpToken, setIdpToken] = useState<string | null>(null);
    const location = useLocation()

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
            fetchAccessToken(idpToken, setAppState, signOut);
          }else{
            getToken();
          }
        }
      }, [appState.auth.status, state.isAuthenticated, idpToken])
    

    return (
        <>
        {
            appState.auth.status === "active" && (
                appState.auth?.userRole && allowedRoles.includes(appState.auth?.userRole) ?
                <Outlet /> : <Unauthorized />
            )
        }
        </>
    )
}