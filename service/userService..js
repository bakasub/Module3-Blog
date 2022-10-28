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
}


module.exports=UserService