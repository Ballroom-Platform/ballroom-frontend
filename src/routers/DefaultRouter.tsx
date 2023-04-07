import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch, useLocation } from "react-router"
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";
import CreateContest from "../pages/CreateContest";
import UpcomingContests from "../pages/UpcomingContests";
import ContestControls from "../pages/ContestControls";
import AddChallengeToContest from "../pages/AddChallengeToContest";

import { Contests, Home, PageNotFound, Dashboard, Challenges, Leaderboard } from "../pages"
import { BrowserRouter } from "react-router-dom";
import { useSignIn } from "../hooks/useSignIn";
import CreateChallenge from "../pages/CreateChallenge";
import ViewChallenge from "../pages/ViewChallenge";
import Users from "../pages/Users";
import ListOfChallengesAdmin from "../pages/ListOfChallengesAdmin";
import EditChallenge from "../pages/EditChallenge";

export const DefaultRouter : React.FC = () => {
    const {signInHandler} = useSignIn();

    return(

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />

                <SecureRoute exact path="/dashboard" component={Dashboard}   callback={signInHandler}/>
                <SecureRoute exact path="/contests/:contestId/leaderboard" component={Leaderboard}    callback={signInHandler}/> 
                <SecureRoute exact path="/contests/:contestId/challenge/:challengeId"  component={Challenge}   callback={signInHandler}/>
                <SecureRoute exact path="/contests/:contestId/challenge/:challengeId/previousSubmissions"  component={PreviousSubmissions}   callback={signInHandler}/>
                <SecureRoute exact path="/contests" component={Contests}    callback={signInHandler}/>
                <SecureRoute exact path="/contests/:contestId" component={Challenges}    callback={signInHandler}/>          

                <SecureRoute exact path="/contestControls/:contestId" component={ContestControls} callback={signInHandler}/>
                <SecureRoute exact path="/addChallengeToContest/:contestId" component={AddChallengeToContest} callback={signInHandler}/>
                <SecureRoute exact path="/createContest" component={CreateContest}  callback={signInHandler}/>
                <SecureRoute exact path="/upcomingContests" component={UpcomingContests} callback={signInHandler}/>
                <SecureRoute exact path="/createChallenge" component={CreateChallenge} callback={signInHandler}/>
                <SecureRoute exact path="/viewChallenge/:challengeId" component={ViewChallenge} callback={signInHandler}/>
                <SecureRoute exact path="/users" component={Users} callback={signInHandler}/>
                <Route exact path="/adminListChallenges" component={ListOfChallengesAdmin}></Route>
                <Route exact path="/editChallenge/:challengeId" component={EditChallenge}></Route>
                <SecureRoute component={PageNotFound}  callback={signInHandler}/>
                
            </Switch>
        </BrowserRouter>
    )
}