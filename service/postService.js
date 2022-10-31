const connection = require('../model/connection')
connection.connecting();

class PostService {

    static dataBlog(id){
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from posts `, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    static deleteBlog( id) {
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
}

module.exports = PostService