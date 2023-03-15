import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch, useLocation } from "react-router"
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";
import CreateContest from "../pages/CreateContest";
import UpcomingContests from "../pages/UpcomingContests";
import ContestControls from "../pages/ContestControls";
import AddChallengeToContest from "../pages/AddChallengeToContest";

import { Contests, Home, PageNotFound, Dashboard, Challenges } from "../pages"
import { BrowserRouter } from "react-router-dom";
import { useSignIn } from "../hooks/useSignIn";

export const DefaultRouter : React.FC = () => {
    const {signInHandler} = useSignIn();

    return(

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <SecureRoute exact path="/dashboard" component={Dashboard} callback={signInHandler}/>
                <SecureRoute exact path="/contests/:contestId/:challengeId"  component={Challenge} callback={signInHandler}/>
                <SecureRoute exact path="/previousSubmissions" component={PreviousSubmissions} callback={signInHandler}/>
                <SecureRoute exact path="/contests" component={Contests} callback={signInHandler} />
                <SecureRoute exact path="/contests/:contestId" component={Challenges} callback={signInHandler} /> 
                <Route exact path="/contestControls/:contestId" component={ContestControls}/>
                <Route exact path="/addChallengeToContest/:contestId" component={AddChallengeToContest}/>
                <Route exact path="/createContest" component={CreateContest}/>
                <Route exact path="/upcomingContests" component={UpcomingContests}/>
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    )
}