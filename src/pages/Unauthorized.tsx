import { useApp } from "../hooks/useApp";
import { Link } from "react-router-dom";

export const Unauthorized : React.FC = () => {
    const {appState} = useApp()

    return (
        <>Unauthorized (<Link to={appState.page.redirectURL[appState.auth.userRole!]}>Click here to go home</Link>)</>
    )
} 