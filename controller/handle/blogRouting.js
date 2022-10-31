const fs = require('fs');
const qs=require('qs')
const UserService = require ('B:\\codegym\\casemodul3\\Module3-Blog\\service\\userService..js')
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


                res.writeHead('200', 'txt/html')
                res.write(createHtml)
                res.end()
            }
        })
    }
    static getHtmlUser(users, createHtml) {
        let tbody = '';
        users.map((user, index) => {
            tbody += `<tr>
                                <th scope="row">${index + 1}</th>
                                <td>${user.username}</td>
                                <td>${user.status}</td>
                                <td>${user.email}</td>
                                <td><a href="admin/edit/${user.userId}" class="btn btn-light">Edit</a></td>
                                <td><a href="admin/deleteuser/${user.userId}" class="btn btn-light">Delete</a></td>
                            </tr>`
        });
        createHtml = createHtml.replace('{users}', tbody);
        return createHtml;
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
                            const status = (Boolean(Buffer.from(user.status).readInt8()))
                            if (information.password === 'admin' && information.name === 'admin') {
                                res.writeHead(301, {'location': `/admin`});
                                return res.end();
                            }
                            if (information.password === user.password && information.name === user.username) {
                                if (status) {
                                    res.writeHead(301, {'Location': `/home/user/${user.userId}`})
                                    return res.end();
                                } else {
                                    alert('tai khoan da bi khoa')
                                    res.writeHead(301, {'Location': '/login'});
                                    return res.end();
                                }
                            }
                        }
                    }
                }
            )
        }
    }
    static showHomeAdmin(req, res) {
        fs.readFile('./views/admin/admin.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                let users = await UserService.dataUser();
                let posts = await PostService.dataBlog()
                createHtml = BlogRouting.getHtmlUser(users, createHtml);
                createHtml = BlogRouting.getHtmlBlog(posts, createHtml);
                res.writeHead(200, 'text/html')
                res.write(createHtml)
                res.end()
            }
        })
    }
    static Edit(req, res, userId) {
        if (req.method === "GET") {
            fs.readFile('./views/admin/adminEditUser.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let user = await UserService.findByUserId(userId);
                    editHtml = editHtml.replace('{status}', user[0].status);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml)
                    res.end()
                }
            })
        } else {
            let userChuck = ''
            req.on('data', chunk => {
                userChuck += chunk
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let user = qs.parse(userChuck)
                    await UserService.editUser(user, userId)
                    res.writeHead(301, {'location': '/admin'});
                    res.end();
                }
            })
        }
    };
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
    static getHtmlBlog(posts, createHtml) {
        let tbody1 = '';
        posts.map((post, index) => {
            tbody1 += `<tr>
                                <th scope="row">${index + 1}</th>
                                <td>${post.id}</td>
                                <td>${post.title}</td>
                                <td><a href="admin/delete/${post.id}" class="btn btn-light">Delete</a></td>
                            </tr>`
        });
        createHtml = createHtml.replace('{posts}', tbody1);
        return createHtml;
    }

    static DeleteBlog(req, res, id) {

        if (req.method === "GET") {
            fs.readFile('./views/crud blog/adminDeleteBlog.html', 'utf-8', async (err, deleteHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let post = await PostService.dataBlog(id);
                    deleteHtml = deleteHtml.replace('{id}', post[0].id);
                    deleteHtml = deleteHtml.replace('{title}', post[0].title);
                    res.writeHead(200, 'text/html');
                    res.write(deleteHtml)
                    res.end()
                }
            })
        } else {
            PostService.deleteBlog(id).then(r =>{
                res.writeHead(301, {'location':'/admin'})
                res.end()
            })
        }
    };
    static DeleteUser(req, res, userId) {

        if (req.method === "GET") {
            fs.readFile('./views/admin/adminDeleteUser.html', 'utf-8', async (err, deleteUserHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let post = await UserService.dataUser(userId);
                    deleteUserHtml = deleteUserHtml.replace('{userId}', post[0].id);
                    deleteUserHtml = deleteUserHtml.replace('{username}', post[0].username);
                    res.writeHead(200, 'text/html');
                    res.write(deleteUserHtml)
                    res.end()
                }
            })
        } else {
            UserService.deleteUser(userId).then(r =>{
                res.writeHead(301, {'location':'/admin'})
                res.end()
            })
        }
    };

    static portHome(dataPorts) {
        let dataPortHtml = `<div class="row">
        <div class="col-12" style="border-radius: 10px">
            <div class="row" style="padding: 30px">`
        for (let port of dataPorts) {
            const status = Boolean(Buffer.from(port.status).readInt8())

            if(status==false){

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
                let dataUser = await UserService.getUser(idUser)
                console.log(dataUser)
                let dataPort = await UserService.getDataPortOfUser(idUser)
                createHtml = createHtml.replace('{userName}', dataUser[0].username)
                createHtml = createHtml.replace('email', dataUser[0].email)
                createHtml = createHtml.replace('{dataPort}', BlogRouting.portProfile(dataPort))
                res.writeHead('200', 'txt/html')
                res.write(createHtml)
                res.end()
            }
        })
    }
    static portProfile(dataPorts){
        let dataPortHtml = `<div class="col-sm-12">
                    <div class="panel panel-white post">`
        for (let port of dataPorts) {



            dataPortHtml += `
                            <div class="post-heading">

                            <div class="pull-left meta">

                                
                            </div>
                        </div>
                        <div class="post-image">
                            <img src="${port.img}" class="image" alt="image post">
                        </div>
                        <div class="post-description">
                          <a href="/read/port/${port.id}"><h4>${port.title}</h4></a>  
                        <h6 class="text-muted time">Date Submitted: ${port.date}</h6>
                            <a href="/post/edit/${port.id}" class="btn btn-success">edit</a>
                            <a href="/post/delete/${port.id}" class="btn btn-success" style="background-color: red">delete</a>
                        </div>
<br>`

        }
        dataPortHtml += `   </div>
                </div>`

        return dataPortHtml
    }
    static editPort(req,res,idPort){

        if (req.method == "GET") {
            fs.readFile("./views/editBlog.html", "utf-8", (err, htmlEditBlog) => {
                if (err) {
                    console.log(err.message)
                }
                res.write(htmlEditBlog)
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
                    let newDataPort = qs.parse(portChuck);
                    let date = new Date()
                    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
                    await UserService.upDatePort(newDataPort,idPort,dateString)
                    // img
                    res.writeHead(301, {'location': `/blog/user/${BlogRouting.userTotal.userId}`})
                    //data
                    res.end()
                }
            });
        }
    }
    static async deletePost(req,res,idPort){
        // let deletee = async (idPort)=>{
        await UserService.deletePost(idPort)
        // }
        // deletee(idPort)
        res.writeHead(301, {'location': `/blog/user/${BlogRouting.userTotal.userId}`})
        //data
        res.end()
    }
}

module.exports= BlogRouting