export const asgardeoConfig = {
    signInRedirectURL: "https://localhost:3000/loginHandler",
    signOutRedirectURL: "https://localhost:3000/",
    clientID: process.env.REACT_APP_CLIENT_ID!,
    baseUrl: "https://api.asgardeo.io/t/ballroomhackathon",
    scope: [ "openid","profile" ]
}