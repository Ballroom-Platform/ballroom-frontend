import { SecureRoute, useAuthContext } from "@asgardeo/auth-react"
import React from "react";
import { Route, Switch, useLocation } from "react-router"
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";
import CreateContest from "../pages/CreateContest";
import UpcomingContests from "../pages/UpcomingContests";
import ContestControls from "../pages/ContestControls";
import AddChallengeToContest from "../pages/AddChallengeToContest";

import { Contests, Home, PageNotFound, Dashboard, Challenges, Leaderboard, FallbackHandler } from "../pages"
import { BrowserRouter } from "react-router-dom";
import { useSignIn } from "../hooks/useSignIn";
import CreateChallenge from "../pages/CreateChallenge";
import ViewChallenge from "../pages/ViewChallenge";
import Users from "../pages/Users";
import ListOfChallengesAdmin from "../pages/ListOfChallengesAdmin";
import EditChallenge from "../pages/EditChallenge";
import { useApp } from "../hooks/useApp";
import PastContestsAdmin from "../pages/PastContestsAdmin";
import PastContestControls from "../pages/PastContestControls";
import OngoingContestsAdmin from "../pages/OngoingContestsAdmin";
import OngoingContestControls from "../pages/OngoingContestControls";

export const DefaultRouter : React.FC = () => {
    const {signInHandler} = useSignIn();
    const {appState} = useApp();
    console.log(appState);

    return(

        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />

                <SecureRoute exact path="/dashboard" component={Dashboard}   callback={signInHandler}/>


                {
                    appState.auth?.userRole && appState.auth.userRole === "contestant" && (
                        <>
                            <SecureRoute exact path="/contests/:contestId/leaderboard" component={Leaderboard}    callback={signInHandler}/> 
                            <SecureRoute exact path="/contests/:contestId/challenge/:challengeId"  component={Challenge}   callback={signInHandler}/>
                            <SecureRoute exact path="/contests/:contestId/challenge/:challengeId/previousSubmissions"  component={PreviousSubmissions}   callback={signInHandler}/>
                            <SecureRoute exact path="/contests" component={Contests}    callback={signInHandler}/>
                            <SecureRoute exact path="/contests/:contestId" component={Challenges}    callback={signInHandler}/>
                            <SecureRoute component={PageNotFound}  callback={signInHandler}/> 
                        </>
                    )
                }         

                {
                    appState.auth?.userRole && appState.auth.userRole === "admin" && (
                        <>
                            <SecureRoute exact path="/contestControls/:contestId" component={ContestControls} callback={signInHandler}/>
                            <SecureRoute exact path="/addChallengeToContest/:contestId" component={AddChallengeToContest} callback={signInHandler}/>
                            <SecureRoute exact path="/createContest" component={CreateContest}  callback={signInHandler}/>
                            <SecureRoute exact path="/upcomingContests" component={UpcomingContests} callback={signInHandler}/>
                            <SecureRoute exact path="/createChallenge" component={CreateChallenge} callback={signInHandler}/>
                            <SecureRoute exact path="/viewChallenge/:challengeId" component={ViewChallenge} callback={signInHandler}/>
                            <SecureRoute exact path="/users" component={Users} callback={signInHandler}/>
                            <SecureRoute exact path="/adminListChallenges" component={ListOfChallengesAdmin} callback={signInHandler}></SecureRoute>
                            <SecureRoute exact path="/editChallenge/:challengeId" component={EditChallenge}callback={signInHandler}></SecureRoute>
                            <SecureRoute exact path="/pastContests" component={PastContestsAdmin} callback={signInHandler}></SecureRoute>
                            <SecureRoute exact path="/pastContests/:contestId" component={PastContestControls} callback={signInHandler}></SecureRoute>
                            <SecureRoute exact path="/ongoingContests/" component={OngoingContestsAdmin} callback={signInHandler}></SecureRoute>
                            <SecureRoute exact path="/ongoingContests/:contestId" component={OngoingContestControls} callback={signInHandler}></SecureRoute>
                            <SecureRoute component={PageNotFound}  callback={signInHandler}/>
                        </>
                    )
                }
                <SecureRoute component={FallbackHandler}   callback={signInHandler}/>
                
            </Switch>
        </BrowserRouter>
    )
}