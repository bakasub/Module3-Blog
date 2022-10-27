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
static dataPort(informationPost,userId){
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
}
module.exports=UserService