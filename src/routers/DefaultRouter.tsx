import React from "react";
import { Route, Routes } from "react-router"
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";
import CreateContest from "../pages/CreateContest";
import UpcomingContests from "../pages/UpcomingContests";
import ContestControls from "../pages/ContestControls";
import AddChallengeToContest from "../pages/AddChallengeToContest";
import { Contests, Home, PageNotFound, LoginHandler, Challenges, Leaderboard } from "../pages"
import CreateChallenge from "../pages/CreateChallenge";
import ViewChallenge from "../pages/ViewChallenge";
import Users from "../pages/Users";
import ListOfChallengesAdmin from "../pages/ListOfChallengesAdmin";
import EditChallenge from "../pages/EditChallenge";
import PastContestsAdmin from "../pages/PastContestsAdmin";
import PastContestControls from "../pages/PastContestControls";
import OngoingContestsAdmin from "../pages/OngoingContestsAdmin";
import OngoingContestControls from "../pages/OngoingContestControls";
import { RequireAuth } from "../components/templates/RequireAuth";
import { RequireIDPAuth } from "../components/templates/RequireIDPAuth";

export const DefaultRouter : React.FC = () => {

    return(
            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<RequireIDPAuth/>}>
                    <Route element={<RequireAuth allowedRoles={["contestant", "admin"]} />}>
                        <Route path="/loginHandler" element={<LoginHandler />}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["contestant"]} />}>
                        <Route path="/contests/:contestId/challenge/:challengeId"  Component={Challenge}/>
                        <Route path="/contests/:contestId/leaderboard" Component={Leaderboard}/> 
                        <Route path="/contests/:contestId/challenge/:challengeId/previousSubmissions"  Component={PreviousSubmissions}/>
                        <Route path="/contests" Component={Contests}/>
                        <Route path="/contests/:contestId" Component={Challenges}/>        
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                        <Route path="/contestControls/:contestId" Component={ContestControls}/>
                        <Route path="/addChallengeToContest/:contestId" Component={AddChallengeToContest}/>
                        <Route path="/createContest" Component={CreateContest}/> 
                        <Route path="/upcomingContests" Component={UpcomingContests}/>
                        <Route path="/createChallenge" Component={CreateChallenge}/>
                        <Route path="/viewChallenge/:challengeId" Component={ViewChallenge}/>
                        <Route path="/users" Component={Users}/>
                        <Route path="/adminListChallenges" Component={ListOfChallengesAdmin}/>
                        <Route path="/editChallenge/:challengeId" Component={EditChallenge}/>
                        <Route path="/pastContests" Component={PastContestsAdmin}/>
                        <Route path="/pastContests/:contestId" Component={PastContestControls}/>
                        <Route path="/ongoingContests/" Component={OngoingContestsAdmin}/>
                        <Route path="/ongoingContests/:contestId" Component={OngoingContestControls}/>    
                    </Route>
                </Route>
                <Route path="/*" Component={PageNotFound}/> 
            </Routes>
        
    )
}