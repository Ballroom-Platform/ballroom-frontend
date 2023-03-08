import { useEffect } from "react"
import { useHistory } from "react-router";
import { useApp } from "../hooks/useApp"
import { URL_LIST } from "../configs/sidebarLinks";

export const Dashboard : React.FC = () => {
    const {appState} = useApp();
    const history = useHistory()
    useEffect(() => {
        history.push(URL_LIST[appState.page.section]);
    }, [])
    return(<></>)
}