import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react"
import { useHistory, useLocation } from "react-router";
import { Layout } from "../components/templates";
import { useApp } from "../hooks/useApp"

export const Dashboard : React.FC = () => {
    const {appState, setAppState} = useApp();
    const history = useHistory();
    useEffect(() => {
        const URL = localStorage.getItem("redirectURL");
        if (URL && URL !== ""){
            localStorage.removeItem("redirectURL")
            history.push(URL)
        }
        
    }, [])
    return(<>
        <Layout>Loading</Layout>
    </>)
}