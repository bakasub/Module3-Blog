let BlogRouting = require ('./handle/blogRouting')
const handler = {
'home' : BlogRouting.showHome,
    'signup':BlogRouting.signUp,
    'login' :BlogRouting.logIn,
    'home/user' : BlogRouting.showHomeUser

}

module.exports = handler;