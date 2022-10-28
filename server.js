const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require("url");
const router = require('./controller/router')
const notFoundRouting = require('./controller/handle/notFoundRouting')

function getUrl(req){
    const urlParse = url.parse(req.url,true)
    const pathName = urlParse.pathname

    return pathName.split('/')
}
const server = http.createServer((req, res) => {
    const arrPath = getUrl(req)
    let trimPath =''
    if(arrPath.length>2){
        trimPath = arrPath[1] +'/'+arrPath[2]
    }else {
        trimPath = arrPath[arrPath.length - 1]
    }
    let choseHander
    if(typeof router[trimPath]== 'undefined'){
         // router.home(req,res)
        choseHander = notFoundRouting.showNotFound
    }else {
        choseHander = router[trimPath]
    }
    choseHander(req,res, +arrPath[3])
})

server.listen(8080,()=>{
    console.log("Server running on port 8080")
})