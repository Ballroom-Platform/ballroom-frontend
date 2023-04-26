import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useSignIn } from "../../hooks/useSignIn";

export const RequireIDPAuth : React.FC = () => {
    const {state} = useAuthContext()
    const [loading, setLoading] = useState<boolean>(true);
    const {signInHandler} = useSignIn()

    console.log("Require idp Auth")

    useEffect(() => {
        console.log("Inside useEffect")
        if(state.isLoading){
            return;
        }

        if(state.isAuthenticated && loading){
            console.log("Loading Stopped")
            setLoading(false);
        }else{
            console.log("Sending to SignIn")
            signInHandler();
        }
        
    }, [state.isLoading, state.isAuthenticated])

    return (
        <>
            {
                !loading && <Outlet />
            }
        </>
    )
}