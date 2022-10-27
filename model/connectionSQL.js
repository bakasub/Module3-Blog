const mySQL = require('mysql')

class ConnectionSQL {
    static configToMySQL = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'demo_database',
        charset: 'utf8_general_ci'
    }
    static getConnection() {
        return mySQL.createConnection(ConnectionSQL.configToMySQL)
    }
    static connecting() {
        ConnectionSQL.getConnection().connect(error => {
            if (error){
                console.log(error)
            } else {
                console.log('Connection success!')
            }
        })
    }
}

module.exports = ConnectionSQL