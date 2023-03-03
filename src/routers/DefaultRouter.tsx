import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch } from "react-router"
import { Layout } from "../components/templates";
import { Dashboard, Home } from "../pages"

export const DefaultRouter : React.FC = () => {
    const {signIn} = useAuthContext();
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Layout>
                <SecureRoute path="/dashboard" component={Dashboard} callback={() => signIn()}/>
            </Layout>
        </Switch>
    )
}