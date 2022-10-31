let BlogRouting = require('./handle/blogRouting')
const handler = {
    '': BlogRouting.showHome,
    'home': BlogRouting.showHome,
    'signup': BlogRouting.signUp,
    'login': BlogRouting.logIn,
    'home/user': BlogRouting.showHomeUser,
    'admin': BlogRouting.showHomeAdmin,
    'admin/edit': BlogRouting.Edit,
    'admin/delete' : BlogRouting.DeleteBlog,
    'admin/deleteuser' : BlogRouting.DeleteUser,
}

module.exports = handler;