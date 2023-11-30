export const asgardeoConfig = {
    signInRedirectURL: window.config.signInRedirectURL,
    signOutRedirectURL: window.config.signOutRedirectURL,
    clientID: window.config.clientID!,
    baseUrl: window.config.baseUrl,
    scope: [ "openid","profile" ]
}