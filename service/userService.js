const connection = require('../model/connectionSQL.js')
class UserService {
    static signUpUser(information){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`insert into users (username, password, email, status) VALUE('${information.name}','${information.password}','${information.email}',1)`,(err,data)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }
    static dataUser(){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from users`,(err,dataUser)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(dataUser)
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
            connection.getConnection().query(`UPDATE posts SET img = '${img}'WHERE id=${portId};`,(err,img)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(img)
                }
            })
        })
    }
    static getIdNewPort(){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select max(id)as idPort from posts`,(err,id)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(id)
                }
            })
        })
    }
}

module.exports=UserService