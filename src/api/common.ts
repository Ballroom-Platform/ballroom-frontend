import { useAuthContext } from "@asgardeo/auth-react";
import { IAppState } from "../helpers/interfaces";
import { useApp } from "../hooks/useApp";
import { STS_URLS } from "../links/backend";
import axios from "./axios";


export const fetchAccessToken = (idpToken : string, setAppState : React.Dispatch<React.SetStateAction<IAppState>>, signOut : Function) => {
    axios.get(STS_URLS.accessToken, {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": "Bearer " + idpToken
        },
    }).then(res => {
        if (res.status === 200){
            setAppState(prev => ({...prev, auth : {...prev.auth, status: "active", accessToken: res?.data?.accessToken}}));
        }else{
            signOut();
        }
    }).catch(()=> signOut());
}
