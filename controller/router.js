const handleRouting = require('./handle/handleRouting')
const BlogRouting = require("./handle/blogRouting");

const handler = {
    "home": handleRouting.showHome,

    "login": handleRouting.logIn,
    'home/user' : handleRouting.showHomeUser,
    "home/user/profile": handleRouting.showUser,
}

module.exports = handler