const fs = require('fs');
const qs = require('qs');

class handleRouting {
    static showHome(req,res){
        fs.readFile('./views/index.html','utf-8',(err,indexHtml)=>{
            if (err) {
                console.log(err)
            } else {
                res.writeHead(200, 'text/html')
                res.write(indexHtml)
                res.end()
            }
        })
    }
}

module.exports = handleRouting