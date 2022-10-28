const fs = require('fs');
const qs = require('qs')
const formidable = require("formidable");
const UserService = require('B:\\codegym\\casemodul3\\Module3-Blog\\service\\userService..js')
let alert = require('alert');

class BlogRouting {
    static userID
    static userTotal
    static portID

    static showHome(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                let dataPort = await UserService.getDataPort()
                createHtml = createHtml.replace('{dataPort}', BlogRouting.portHome(dataPort))
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
                    let dataUser = await UserService.dataUser()
                    for (let user of dataUser) {
                        if (user.username == information.name) {
                            alert("username đã dùng")
                            res.writeHead(301, {'location': '/signup'})
                            res.end();
                            return
                        }
                    }
                    if (information.password.length < 8) {
                        alert("mk phai tren 8 ki tu")
                        res.writeHead(301, {'location': '/signup'})
                        res.end();
                    } else if (information.password != information.passwordRepeat) {
                        alert("mk chua trung khop")
                        res.writeHead(301, {'location': '/signup'})
                        res.end();
                    } else {
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

                    let dataUser = await UserService.dataUser()
                    for (let user of dataUser) {
                        if (information.password == user.password && information.name == user.username) {
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

    static showHomeUser(req, res) {
        fs.readFile('./views/user.html', 'utf-8', async (err, createHtmlUser) => {
            if (err) {
                console.log(err.message)
            } else {
                createHtmlUser = createHtmlUser.replace('{id}', BlogRouting.userTotal.userId)
                createHtmlUser = createHtmlUser.replace('{id}', BlogRouting.userTotal.userId)
                createHtmlUser = createHtmlUser.replace('{id}', BlogRouting.userTotal.userId)
                createHtmlUser = createHtmlUser.replace('{Name}', BlogRouting.userTotal.username)
                let dataPort = await UserService.getDataPort()
                createHtmlUser = createHtmlUser.replace('{dataPort}', BlogRouting.portHome(dataPort))
                res.writeHead('200', 'txt/html')
                res.write(createHtmlUser)
                res.end()
            }
        })
    }

    static portHome(dataPorts) {
        let dataPortHtml = `<div class="row">
        <div class="col-12" style="border-radius: 10px">
            <div class="row" style="padding: 30px">`
        for (let port of dataPorts) {
            const status = Boolean(Buffer.from(port.status).readInt8())

            if(status==false){
                console.log('aaaa')
            }else { dataPortHtml += `<div class="card; col-3" style="width: 18rem;">
                    <img src="${port.img}" class="card-img-top" alt="..." style="width: 100%; height: 320px">
                    <div class="card-body">
                        <h5 class="card-title">${port.title}</h5>
                        <p style="font-size:10px ">Date Submitted: ${port.date}</p>
              
                        <a href="/read/port/${port.id}" class="btn btn-light">Read</a>
                    </div>
                </div>`}

        }
        dataPortHtml += `</div>
        </div>
    </div>`

        return dataPortHtml
    }

    static writeBlog(req, res) {
        if (req.method == "GET") {
            fs.readFile("./views/writeBlog.html", "utf-8", (err, htmlWriteBlog) => {
                if (err) {
                    console.log(err.message)
                }
                htmlWriteBlog = htmlWriteBlog.replace('{id}', BlogRouting.userTotal.userId)
                res.write(htmlWriteBlog)
                res.end()
            })
        } else {
            //uploads


            //data
            let portChuck = ''
            req.on('data', chunk => {
                portChuck += chunk
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let dataPort = qs.parse(portChuck);
                    let date = new Date()
                    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
                    await UserService.createDataPort(dataPort, BlogRouting.userTotal.userId, dateString)
                    BlogRouting.portID = await UserService.getIdNewPort()

                    // img
                    res.writeHead(301, {'location': `/creatblog2/user/${BlogRouting.userTotal.userId}`})
                    //data
                    res.end()
                }
            });
        }
    }

    static upLoadWriteBlog(req, res) {
        if (req.method == "GET") {
            fs.readFile("./views/writeBlog2.html", "utf-8", (err, htmlWriteBlog2) => {
                if (err) {
                    console.log(err.message)
                }
                res.write(htmlWriteBlog2)
                res.end()
            })
        } else {
            const form = formidable({multiples: true});
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log(err);
                }
                res.writeHead(200, {"Content-Type": "application/json"});
                const dataImgInput = files.multipleFiles;
                if (!dataImgInput.length) {
                    let tmpPath = dataImgInput.filepath;
                    let newPath = __dirname + "/uploads/" + dataImgInput.originalFilename;
                    await UserService.createImgDataPort(`../../controller/handle/uploads/${dataImgInput.originalFilename}`, BlogRouting.portID[0].idPort)

                    fs.readFile(newPath, (err) => {
                        if (err) {
                            fs.copyFile(tmpPath, newPath, (err) => {
                                if (err) throw err;
                            });
                        }
                    })
                    res.writeHead(301, {'location': `/home/user/${BlogRouting.userTotal.userId}`})
                    res.end();
                    ;
                } else {
                    for (const e of dataImgInput) {
                        let tmpPath = e.filepath;
                        let newPath = __dirname + "/uploads/" + e.originalFilename;
                        await fs.readFile(newPath, (err) => {
                            if (err) {
                                fs.copyFile(tmpPath, newPath, (err) => {
                                    if (err) throw err;
                                });
                            }
                        });
                    }
                }
            });
        }
    }

    static myBlog(req, res) {
        fs.readFile('./views/profile.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {


                res.writeHead('200', 'txt/html')
                res.write(createHtml)
                res.end()
            }
        })
    }
    static readPort(req,res,id){
        fs.readFile('./views/readPort.html', 'utf-8', async (err, createReadPort) => {
            if (err) {
                console.log(err.message)
            } else {
             let ports = await UserService.getDataPortWithId(id)
                let dataPort
                for (let port  of ports) {
                    if(port.id ==id){
                        dataPort = port
                    }
                }
                createReadPort = createReadPort.replace('{id}',BlogRouting.userTotal.userId)
                createReadPort = createReadPort.replace('{id}',BlogRouting.userTotal.userId)
                createReadPort = createReadPort.replace('{Title}',dataPort.title)
                createReadPort = createReadPort.replace('{Nội Dung}',dataPort.content)
                createReadPort = createReadPort.replace('{img}',dataPort.img)
                res.writeHead('200', 'txt/html')
                res.write(createReadPort)
                res.end()
            }
        })
    }
    static profile(req,res,idUser){
        fs.readFile('./views/profile.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                let dataPort = await UserService.getDataPort()
                createHtml = createHtml.replace('{dataPort}', BlogRouting.portHome(dataPort))
                res.writeHead('200', 'txt/html')
                res.write(createHtml)
                res.end()
            }
        })
    }
}

module.exports = BlogRouting