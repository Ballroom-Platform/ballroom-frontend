import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch } from "react-router"
import { Layout } from "../components/templates";
import { Contest, Home, PageNotFound, Dashboard } from "../pages"

export const DefaultRouter : React.FC = () => {
    const {signIn} = useAuthContext();
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Layout>
                <SecureRoute exact path="/contests" component={Contest} callback={() => signIn()}/>
            </Layout>
            <Route component={PageNotFound} />
        </Switch>
    )
}