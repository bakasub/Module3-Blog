const connection = require('../model/connection')
class UserService {
    static signUpUser(information){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`insert into users (username, password, email, status) VALUE('${information.name}','${information.password}','${information.email}',1)`,(err,products)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(products)
                }
            })
        })
    }
    static dataUser(){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from users`,(err,products)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(products)
                }
            })
        })
}
static getUser(idUser){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`select * from users where userId =${idUser}`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
static createDataPort(dataPort,userId,date){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`insert into posts(title, content, date,userId,status)value('${dataPort.title} ','${dataPort.description}','${date}',${userId},${dataPort.status});`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
static createImgDataPort(img,portId){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`UPDATE posts SET img = '${img}'WHERE id=${portId};`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
static getIdNewPort(){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`select max(id)as idPort from posts`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
static getDataPort(){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`select * from posts`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
    static getDataPortOfUser(userId){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from posts where userId = ${userId} `,(err,products)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(products)
                }
            })
        })
    }

static getDataPortWithId(id){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`select * from posts where posts.id= ${id}`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
static upDatePort(newDataPort,idPort,date){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`UPDATE posts SET title = '${newDataPort.title}',   content = '${newDataPort.description}', date = '${date}',status = ${newDataPort.status} WHERE id =${idPort}`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
static deletePost(idPort){
    return new Promise((resolve, reject) => {
        connection.getConnection().query(`DELETE FROM posts WHERE id = ${idPort}`,(err,products)=>{
            if(err){
                reject(err)
            }else {
                resolve(products)
            }
        })
    })
}
// quan
    static editUser(user, userId) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`update users set status = ${user.status} where userId = ${userId}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('Block Success !!')
                    resolve(products)
                }
            })
        })
    }

    static deleteBlog(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`delete from posts where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('Delete Success !!')
                    resolve(products)
                }
            })
        })
    }
    static deleteUser(userId) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`delete from users where userId = ${userId}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('Delete Success !!')
                    resolve(products)
                }
            })
        })
    }
    static findByUserId(userId){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from users where userId = ${userId}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }
}


module.exports=UserService