import React from "react";
import { Route, Routes } from "react-router"
import Challenge from "../pages/Challenge";
import PreviousSubmissions from "../pages/PreviousSubmissions";
import CreateContest from "../pages/CreateContest";
import UpcomingContests from "../pages/UpcomingContests";
import ContestControls from "../pages/ContestControls";
import AddChallengeToContest from "../pages/AddChallengeToContest";
import { Contests, Home, PageNotFound, LoginHandler, Challenges, Leaderboard, Scoreboard } from "../pages"
import CreateChallenge from "../pages/CreateChallenge";
import ViewChallenge from "../pages/ViewChallenge";
import Users from "../pages/Users";
import ListOfChallengesAdmin from "../pages/ListOfChallengesAdmin";
import EditChallenge from "../pages/EditChallenge";
import PastContestsAdmin from "../pages/PastContestsAdmin";
import PastContestControls from "../pages/PastContestControls";
import OngoingContestsAdmin from "../pages/OngoingContestsAdmin";
import OngoingContestControls from "../pages/OngoingContestControls";
import ViewAllChallenges from "../pages/ViewAllChallenges";
import { RequireAuth } from "../components/templates/RequireAuth";
import { RequireIDPAuth } from "../components/templates/RequireIDPAuth";
import OngoingContestControlView from "../pages/OngoingContestControlView";
import PastContestControlView from "../pages/PastContestControlView";
import ContestControlView from "../pages/ContestControlView";
import ViewOwnedChallenges from "../pages/ViewOwnedChallenges";
import ViewSharedChallenges from "../pages/ViewSharedChallenges";
import UserProfile from "../pages/UserProfile";
import ContestantUpcomingContest from "../pages/ContestantUpcomingContest";
import ContestantOngoingContest from "../pages/ContestantOngoingContest";
import ContestantPastContest from "../pages/ContestantPastContest";

export const DefaultRouter : React.FC = () => {

    return(
            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<RequireIDPAuth/>}>
                    <Route element={<RequireAuth allowedRoles={["contestant", "admin"]} />}>
                        <Route path="/loginHandler" element={<LoginHandler />}/>
                        <Route path="/userProfile/:userId" Component={UserProfile}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["contestant"]} />}>
                        <Route path="/contests/:contestId/challenge/:challengeId"  Component={Challenge}/>
                        <Route path="/contests/:contestId/leaderboard" Component={Leaderboard}/> 
                        <Route path="/contests/:contestId/scoreboard" Component={Scoreboard}/> 
                        <Route path="/contests/:contestId/challenge/:challengeId/previousSubmissions"  Component={PreviousSubmissions}/>
                        <Route path="/contests" Component={Contests}/>
                        <Route path="/contests/:contestId" Component={Challenges}/>
                    <Route path="/Contests/ongoing/:contestId" Component={ContestantOngoingContest} />
                    <Route path="/Contests/past/:contestId" Component={ContestantPastContest} />
                    <Route path="/Contests/upcoming/:contestId" Component={ContestantUpcomingContest} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                        <Route path="/upcomingContests/:contestId" Component={ContestControls}/>
                        <Route path="/upcomingContests/view/:contestId" Component={ContestControlView}/>
                        <Route path="/upcomingContests/:contestId/:challengeId" Component={ViewChallenge} />
                        <Route path="/upcomingContests/view/:contestId/:challengeId" Component={ViewChallenge}/>
                        <Route path="/addChallengeToContest/:contestId" Component={AddChallengeToContest}/>
                        <Route path="/createContest" Component={CreateContest}/> 
                        <Route path="/upcomingContests" Component={UpcomingContests}/>
                        <Route path="/createChallenge" Component={CreateChallenge}/>
                        <Route path="/users" Component={Users}/>
                        <Route path="/adminListChallenges" Component={ListOfChallengesAdmin}/>
                        <Route path="/editChallenge/:challengeId" Component={EditChallenge}/>
                        <Route path="/pastContests" Component={PastContestsAdmin}/>
                        <Route path="/pastContests/:contestId" Component={PastContestControls}/>
                        <Route path="/pastContests/view/:contestId" Component={PastContestControlView}/>
                        <Route path="/pastContests/:contestId/:challengeId" Component={ViewChallenge} />
                        <Route path="/pastContests/view/:contestId/:challengeId" Component={ViewChallenge}/>
                        <Route path="/ongoingContests" Component={OngoingContestsAdmin}/>
                        <Route path="/ongoingContests/:contestId" Component={OngoingContestControls}/> 
                        <Route path="/ongoingContests/view/:contestId" Component={OngoingContestControlView}/>    
                        <Route path="/ongoingContests/:contestId/:challengeId" Component={ViewChallenge} />
                        <Route path="/ongoingContests/view/:contestId/:challengeId" Component={ViewChallenge}/>
                        <Route path="/allChallenges" Component={ViewAllChallenges}/>
                        <Route path="/myChallenges" Component={ViewOwnedChallenges}/>
                        <Route path="/sharedChallenges" Component={ViewSharedChallenges}/>
                        <Route path="/challenges/:challengeId" Component={ViewChallenge}/>
                    </Route>
                </Route>
                <Route path="/*" Component={PageNotFound}/> 
            </Routes>
        
    )
}