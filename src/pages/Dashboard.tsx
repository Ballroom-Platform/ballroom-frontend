import { useAuthContext } from "@asgardeo/auth-react"
import { Button } from "@mui/material"
import { Sidebar } from "../components/organisms"

export const Dashboard : React.FC = () => {
    const {signOut} = useAuthContext()
    return(
        <>
            <Sidebar />
        </>
        
    )
}