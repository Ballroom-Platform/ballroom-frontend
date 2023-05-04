import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router";
import { Layout } from "../components/templates";
import { useApp } from "../hooks/useApp"
import { URL_LIST } from "../links/frontend";

export const LoginHandler : React.FC = () => {
    const {appState} = useApp();
    const navigate = useNavigate();
    useEffect(() => {
        const URL = localStorage.getItem("redirectURL");
        if (URL && URL !== "" && URL !== URL_LIST["loginHandler"]){
            localStorage.removeItem("redirectURL")
            navigate(URL)
        }else{
            navigate(appState.page.redirectURL[appState.auth?.userRole!]);
        }
        
    }, [])
    return(<>
        Loading
    </>)
}