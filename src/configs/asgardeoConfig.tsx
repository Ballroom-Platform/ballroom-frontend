export const asgardeoConfig = {
    signInRedirectURL: "https://2b34f7b5-5b06-4f55-ba18-16bffa3b1bba.e1-us-east-azure.choreoapps.dev/loginHandler",
    signOutRedirectURL: "https://2b34f7b5-5b06-4f55-ba18-16bffa3b1bba.e1-us-east-azure.choreoapps.dev/",
    clientID: process.env.REACT_APP_CLIENT_ID!,
    baseUrl: "https://api.asgardeo.io/t/ballroomhackathon",
    scope: [ "openid","profile" ]
}