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
    'post/delete':BlogRouting.deletePost,
    // quann
    'admin': BlogRouting.showHomeAdmin,
    'admin/edit': BlogRouting.Edit,
    'admin/delete' : BlogRouting.DeleteBlog,
    'admin/deleteuser' : BlogRouting.DeleteUser,
}

module.exports = handler;