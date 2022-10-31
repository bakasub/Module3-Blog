const connection = require('C:\\Users\\admin\\WebstormProjects\\MD3\\Module3-Blog\\model\\connection.js')
connection.connecting();

class UserService {
    static signUpUser(information) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`insert into users (username, password, email, status) VALUE('${information.name}','${information.password}','${information.email}',1)`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    static dataUser() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select *  from users `, (err, users) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(users)
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

}

module.exports = UserService