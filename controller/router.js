let BlogRouting = require ('./handle/blogRouting')
const handler = {
'home' : BlogRouting.showHome,
    'signup':BlogRouting.signUp,
    'login' :BlogRouting.logIn,
    'home/user' : BlogRouting.showHomeUser,
    'creatblog/user' : BlogRouting.writeBlog,
    'creatblog2/user': BlogRouting.upLoadWriteBlog


}

module.exports = handler;