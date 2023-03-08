import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch } from "react-router"
import { Layout } from "../components/templates";
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";
import { Contest, Home, PageNotFound, Dashboard } from "../pages"

export const DefaultRouter : React.FC = () => {
    const {signIn} = useAuthContext();
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <SecureRoute exact path="/dashboard" component={Dashboard} callback={() => signIn()}/>
            <Layout>
                <Route exact path="/challenge" component={Challenge} />
                <Route exact path="/previousSubmissions" component={PreviousSubmissions} />
                <SecureRoute exact path="/contests" component={Contest} callback={() => signIn()}/>
            </Layout>
            <Route component={PageNotFound} />
        </Switch>
    )
}