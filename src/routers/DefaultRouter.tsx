import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch } from "react-router"
import { Layout } from "../components/templates";
import { Dashboard, Home } from "../pages"
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";

export const DefaultRouter : React.FC = () => {
    const {signIn} = useAuthContext();
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Layout>
                {/* <SecureRoute path="/dashboard" component={Dashboard} callback={() => signIn()}/> */}
                {/* this below one is only for development purposes */}
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/challenge" component={Challenge} />
                <Route exact path="/previousSubmissions" component={PreviousSubmissions} />

            </Layout>
        </Switch>
    )
}