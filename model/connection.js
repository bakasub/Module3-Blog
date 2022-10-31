const mysql = require('mysql')
class Connection {
    static configToMySql = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'blog_database',
        charset: 'utf8_general_ci'
    }
     static getConnection(){
        return mysql.createConnection(Connection.configToMySql)
    }
    static connecting(){
        this.getConnection().connect(error=>{
            if(error){
                console.log(error)
            }else {
                console.log('connection success')
            }
        })
    }
}

module.exports = Connection ;