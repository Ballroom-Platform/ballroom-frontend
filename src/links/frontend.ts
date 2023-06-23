const FRONTEND_BASE = "https://localhost:3000";

export const FRONTEND_PUBLIC = {
    logo : {
        black : FRONTEND_BASE + "/logo-black.png",
        color : FRONTEND_BASE + "/logo-color.png",
    }
}

export const URL_LIST : Record<string, string> = {
    contests : "/contests",
    settings : "/settings",
    loginHandler : "/loginHandler",
    upcomingContests : "/upcomingContests",
    createContest : "/createContest",
    createChallenge : "/createChallenge",
    ongoingContests : "/ongoingContests",
    pastContests : "/pastContests",
    //allChallenges : "/allChallenges",
    myChallenges : "/myChallenges",
    sharedChallenges : "/sharedChallenges",
}

