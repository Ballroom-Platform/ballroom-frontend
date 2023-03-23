const BFF_BASE_URLS = {
    scoreAPI : "http://localhost:9092/score",
    contestService: "http://localhost:9098/contestService",
    challengeService: "http://localhost:9096/challengeService"
}

export const BFF_URLS = {
    uploadService: "http://localhost:9090/uploadSolution",
    score_submissionScore: BFF_BASE_URLS.scoreAPI + "/submissionScore",
    contestService: BFF_BASE_URLS.contestService,
    challengeService: BFF_BASE_URLS.challengeService
}

const STS_BASE = "http://localhost:9093/sts";

export const STS_URLS = {
    accessToken :  STS_BASE + "/accessToken",
    refreshToken : STS_BASE + "/refreshToken"
}