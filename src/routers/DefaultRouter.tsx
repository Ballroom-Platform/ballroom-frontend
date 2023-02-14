import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch } from "react-router"
import { Dashboard, Home } from "../pages"

export const DefaultRouter : React.FC = () => {
    const {signIn} = useAuthContext();
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <SecureRoute path="/dashboard" component={Dashboard} callback={() => signIn()}/>
        </Switch>
    )
}