import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch } from "react-router"
import { Layout } from "../components/templates";
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";
import { Contest, Home, PageNotFound, Dashboard } from "../pages"
import CreateContest from "../pages/CreateContest";
import UpcomingContests from "../pages/UpcomingContests";
import ContestControls from "../pages/ContestControls";
import AddChallengeToContest from "../pages/AddChallengeToContest";

export const DefaultRouter : React.FC = () => {
    const {signIn} = useAuthContext();
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <SecureRoute exact path="/dashboard" component={Dashboard} callback={() => signIn()}/> */}
            <Route exact path="/dashboard" component={Dashboard}/>

            <Layout>
                <Route exact path="/challenge" component={Challenge} />
                <Route exact path="/previousSubmissions" component={PreviousSubmissions} />
                {/* <SecureRoute exact path="/contests" component={Contest} callback={() => signIn()}/> */}
                <Route exact path="/contests" component={Contest}/>
                <Route exact path="/createContest" component={CreateContest}/>
                <Route exact path="/upcomingContests" component={UpcomingContests}/>
                <Route exact path="/contestControls" component={ContestControls}/>
                <Route exact path="/addChallengeToContest" component={AddChallengeToContest}/>
            </Layout>


            <Route component={PageNotFound} />
        </Switch>
    )
}