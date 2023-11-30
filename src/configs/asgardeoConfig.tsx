export const asgardeoConfig = {
    signInRedirectURL: "https://79c26f75-8047-4614-b2b2-bd42e570502f.e1-us-east-azure.choreoapps.dev/loginHandler",
    signOutRedirectURL: "https://79c26f75-8047-4614-b2b2-bd42e570502f.e1-us-east-azure.choreoapps.dev",
    clientID: process.env.REACT_APP_CLIENT_ID!,
    baseUrl: "https://api.asgardeo.io/t/ballroomhackathon",
    scope: [ "openid","profile" ]
}
