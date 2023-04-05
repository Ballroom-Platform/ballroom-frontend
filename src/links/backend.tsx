const BFF_BASE_URLS = {
    scoreAPI : "http://localhost:9092/score",
    contestService: "http://localhost:9098/contestService",
    challengeService: "http://localhost:9096/challengeService",
    userService: "http://localhost:9095/userService"
}

export const BFF_URLS = {
    uploadService: "http://localhost:9094/uploadSolution",
    score_submissionScore: BFF_BASE_URLS.scoreAPI + "/submissionScore",
    contestService: BFF_BASE_URLS.contestService,
    challengeService: BFF_BASE_URLS.challengeService,
    submissionList: BFF_BASE_URLS.scoreAPI + "/submissionList",
    submissionFile: BFF_BASE_URLS.scoreAPI + "/submissionFile",
    leaderboard : BFF_BASE_URLS.scoreAPI + "/leaderboard"
    userService: BFF_BASE_URLS.userService
}

const STS_BASE = "http://localhost:9093/sts";

export const STS_URLS = {
    accessToken :  STS_BASE + "/accessToken",
    refreshToken : STS_BASE + "/refreshToken"
}