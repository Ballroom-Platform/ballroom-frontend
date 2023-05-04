import React, { useEffect, useState } from "react";
import { useApp } from "../../hooks/useApp"
import { TRole } from "../../helpers/interfaces";
import { Navigate, Outlet, useLocation } from "react-router";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { fetchAccessToken, getUserRole } from "../../api/common";
import { Unauthorized } from "../../pages/Unauthorized";

interface IProps {
    allowedRoles : Array<TRole>;
}

export const RequireAuth : React.FC<IProps> = ({allowedRoles}) => {
    const {appState, setAppState} = useApp();
    const {getAccessToken, getBasicUserInfo, signOut, state} = useAuthContext();
    const [idpToken, setIdpToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<BasicUserInfo>({} as BasicUserInfo)
    const [userRole, setUserRole] = useState<string>('');
    const location = useLocation()

    useEffect(()=>{
        if (appState.auth.status === "inactive" && state.isAuthenticated) {
          const getToken = async () => {
            const token  = await getAccessToken();
            const userIdpInfo = await getBasicUserInfo();
            setUserInfo(userIdpInfo);
            setIdpToken(token);
            return;
          }

          const fetchUserRole = async () => {
            const userRole = await getUserRole(userInfo.sub!);
            setUserRole(userRole);
            setAppState(prev => ({...prev, auth:{...prev.auth, userID: userInfo.sub, userRole}}))
          }
    
          if(idpToken !== null){
            fetchAccessToken(idpToken).then((res) => {
              if (res.status === 200) {
                console.log("Setting App state");
                setAppState(prev => ({ ...prev, auth: { ...(prev.auth), status: "active", accessToken: res?.data?.data?.accessToken } }));
                console.log("Getting user role")
                if(!(appState.auth.userRole)){
                  fetchUserRole();
                }
              }else{
                signOut()
              }
            }).catch(() => signOut());
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