const BFF_BASE_URLS = {
    scoreAPI : "http://localhost:9092/score",
    contestService: "http://localhost:9092/contestService"
}

export const BFF_URLS = {
    uploadService: "http://localhost:9090/uploadSolution",
    score_submissionScore: BFF_BASE_URLS.scoreAPI + "/submissionScore",
    contestService: BFF_BASE_URLS.contestService
}

export const STS_URLS = {
    accessToken : "http://localhost:9093/sts/accessToken"
}