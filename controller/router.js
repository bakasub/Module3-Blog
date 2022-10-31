let BlogRouting = require ('./handle/blogRouting')
const handler = {
'home' : BlogRouting.showHome,
    'signup':BlogRouting.signUp,
    'login' :BlogRouting.logIn,
    'home/user' : BlogRouting.showHomeUser,
    'creatblog/user' : BlogRouting.writeBlog,
    'creatblog2/user': BlogRouting.upLoadWriteBlog,
    'read/port' : BlogRouting.readPort,
    'blog/user' : BlogRouting.profile,
    'post/edit' : BlogRouting.editPort,
    'post/delete':BlogRouting.deletePost

}

module.exports = handler;