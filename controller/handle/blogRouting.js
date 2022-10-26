const fs = require('fs');
const qs=require('qs')
const UserService = require ('B:\\codegym\\casemodul3\\Module3-Blog\\service\\userService..js')
let alert = require('alert');
class BlogRouting {
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

                            res.writeHead(301, {'location': `/home/user/${user.userId}`})
                            res.end();
                        }
                    }

                }
            })
        }
    }
    static showHomeUser(req, res){
        fs.readFile('./views/user.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {


                res.writeHead('200', 'txt/html')
                res.write(createHtml)
                res.end()
            }
        })
    }

}

module.exports= BlogRouting