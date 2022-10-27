const fs = require('fs');
const qs=require('qs')
const UserService = require ('D:\\Hoc\\Blog\\Module3-Blog\\service\\userService.js')
let alert = require('alert');
class BlogRouting {
    static userID
    static userTotal
    static showHome(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {


                res.writeHead('200', 'txt/html')
                res.write(createHtml)
                res.end()
            }
        })
    }

    static signUp(req, res) {
        if (req.method == "GET") {
            fs.readFile("./views/signUp.html", "utf-8", (err, htmlSignUp) => {
                if (err) {
                    console.log(err.message)
                }
                res.write(htmlSignUp)
                res.end()
            })
        } else {
            let informationChuck = ''
            req.on('data', chunk => {
                informationChuck += chunk
            })

            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let information = qs.parse(informationChuck)
                    let dataUser =  await UserService.dataUser()
                    for (let user of dataUser) {
                        if(user.username==information.name){
                            alert("username đã dùng")
                            res.writeHead(301, {'location': '/signup'})
                            res.end();
                            return
                        }
                    }
                    if(information.password.length<8){
                        alert("mk phai tren 8 ki tu")
                        res.writeHead(301, {'location': '/signup'})
                        res.end();
                    }
                    else if (information.password!=information.passwordRepeat){
                        alert("mk chua trung khop")
                        res.writeHead(301, {'location': '/signup'})
                        res.end();
                    }
                    else {
                        await UserService.signUpUser(information)
                        res.writeHead(301, {'location': '/login'});
                        res.end();
                    }
                }
            })
        }
    }

    static logIn(req, res) {
        if (req.method == "GET") {
            fs.readFile("./views/login.html", "utf-8", (err, htmlSignUp) => {
                if (err) {
                    console.log(err.message)
                }
                res.write(htmlSignUp)
                res.end()
            })
        } else {
            let informationChuck = ''
            req.on('data', chunk => {
                informationChuck += chunk
            })

            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let information = qs.parse(informationChuck)
                    console.log(information)
                    let dataUser =  await UserService.dataUser()
                    for (let user of dataUser) {
                        if(information.password==user.password&&information.name==user.username){
                            BlogRouting.userID = user.userId
                            BlogRouting.userTotal = user
                            res.writeHead(301, {'location': `/home/user/${user.userId}`})
                            res.end();
                        }
                    }

                }
            })
        }
    }
    static showHomeUser(req, res){
        fs.readFile('./views/user.html', 'utf-8', async (err, createHtmlUser) => {
            if (err) {
                console.log(err.message)
            } else {
                createHtmlUser = createHtmlUser.replace('{idd}',BlogRouting.userTotal.userId)
                createHtmlUser = createHtmlUser.replace('{Name}',BlogRouting.userTotal.username)
                res.writeHead('200', 'txt/html')
                res.write(createHtmlUser)
                res.end()
            }
        })
    }
    static writeBlog(req,res){
        if (req.method == "GET") {
            fs.readFile("./views/writeBlog.html", "utf-8", (err, htmlWriteBlog) => {
                if (err) {
                    console.log(err.message)
                }
                htmlWriteBlog = htmlWriteBlog.replace('{id}',BlogRouting.userTotal.userId)
                res.write(htmlWriteBlog)
                res.end()
            })
        } else {
            let informationChuck = ''
            req.on('data', chunk => {
                informationChuck += chunk
            })

            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let information = qs.parse(informationChuck)
                    console.log(information)
                    let dataUser =  await UserService.dataUser()
                    for (let user of dataUser) {
                        if(information.password==user.password&&information.name==user.username){
                            BlogRouting.userID = user.userId
                            res.writeHead(301, {'location': `/home/user/${user.userId}`})
                            res.end();
                        }
                    }

                }
            })
        }
    }

    static showUserBlog (req,res) {
        if (req.method == "GET") {
            fs.readFile ("","utf-8",(err,htmlUserBlog)=>{
                if (err) {
                    console.log(err.message)
                } else {
                    let userBlog = ''

                }
            })
        }
    }

}

module.exports= BlogRouting