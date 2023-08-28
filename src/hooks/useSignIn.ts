import { useAuthContext } from "@asgardeo/auth-react";
import { useLocation } from "react-router";
import { URL_LIST } from "../links/frontend";

export const useSignIn = () => {
    const { signIn } = useAuthContext();
    const location = useLocation();
    const signInHandler = () => {
        signIn()
    }

    return { signInHandler }

}