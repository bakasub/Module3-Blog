const mysql = require('mysql')
class Connection {
    configToMySql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'blog_database',
        charset: 'utf8_general_ci'
    }
    getConnection(){
        return mysql.createConnection(this.configToMySql)
    }
    connecting(){
        this.getConnection().connect(error=>{
            if(error){
                console.log(error)
            }else {
                console.log('connection success')
            }
        })
    }
}
let connection = new Connection()
connection.connecting()
module.exports = connection ;