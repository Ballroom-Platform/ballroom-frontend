import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useSignIn } from "../../hooks/useSignIn";

export const RequireIDPAuth : React.FC = () => {
    const {state} = useAuthContext()
    const [loading, setLoading] = useState<boolean>(true);
    const {signInHandler} = useSignIn()

    useEffect(() => {
        if(state.isLoading){
            return;
        }

        if(state.isAuthenticated && loading){
            setLoading(false);
        }else{
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