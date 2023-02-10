const BFF_BASE_URLS = {
    scoreAPI : "http://localhost:9092/score"
}

export const BFF_URLS = {
    uploadService: "http://localhost:9090/uploadSolution",
    score_submissionScore: BFF_BASE_URLS.scoreAPI + "/submissionScore"
}