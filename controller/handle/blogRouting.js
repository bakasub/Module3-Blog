const fs = require('fs');
const qs = require('qs')
const UserService = require('C:\\Users\\admin\\WebstormProjects\\MD3\\Module3-Blog\\service\\userService..js')
let alert = require('alert');

class BlogRouting {
    static getHtmlUser(users, createHtml) {
        let tbody = '';
        users.map((user, index) => {
            tbody += `<tr>
                                <th scope="row">${index + 1}</th>
                                <td>${user.username}</td>
                                <td>${user.status}</td>
                                <td>${user.email}</td>
                                <td><a href="admin/edit/${user.userId}" class="btn btn-light">Edit</a></td>
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
                        alert("mat khau phai tren 8 ki tu")
                        res.writeHead(301, {'location': '/signup'})
                        res.end();
                    } else if (information.password != information.passwordRepeat) {
                        alert("mau khau chua trung khop")
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

    static showHome(req, res) {
        fs.readFile('./views/index.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                res.writeHead('200', 'text/html')
                res.write(createHtml)
                res.end()
            }
        })
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
                createHtml = BlogRouting.getHtmlUser(users, createHtml);
                res.writeHead(200, 'text/html')
                res.write(createHtml)
                res.end()
            }
        })
    }

    static showHomeUser(req, res) {
        fs.readFile('./views/user.html', 'utf-8', async (err, createHtml) => {
            if (err) {
                console.log(err.message)
            } else {
                res.writeHead('200', 'text/html')
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
                    console.log(user)
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
}

module.exports = BlogRouting