const ConnectionSQL = require('../model/connectionSQL')
ConnectionSQL.connecting()

class BlogService {
    static getBlogs() {
        let connection = ConnectionSQL.getConnection()
        return new Promise((resolve, reject) => {
            connection.query('select * from posts', (err, posts) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(posts)
                }
            })
        })
    }

    static getUserBlogs() {
        let connection = ConnectionSQL.getConnection()
        return new Promise((resolve, reject) => {
            connection.query('select * from posts join posts posts on posts.id join users users on users.userId group by posts.userId', (err, posts) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(posts)
                }
            })
        })
    }
}

module.exports = BlogService