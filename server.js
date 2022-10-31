const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require("url");
const router = require('./controller/router')
let mimeTypes = {
    'jpg' : 'image/ipg',
    'jpeg' : 'image/ipg',
    'png' : 'image/png',
    'js' : 'text/javascript',
    'css' :'text/css',
    'svg' : 'image/svg+xml',
    'ttf' : 'font/ttf',
    'woff' : 'font/woff',
    'woff2' : 'font/woff2',
    'eot' : 'application/vnd.ms-fontobject'
}
function getUrl(req){
    const urlParse = url.parse(req.url,true)
    const pathName = urlParse.pathname

    return pathName.split('/')
}
const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;
    const filesDefences = urlPath.match(/\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.jpeg/);
    if(filesDefences){
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200,{'Content-Type': extension});
        fs.createReadStream(__dirname + req.url).pipe(res)
    }else {
        const arrPath = getUrl(req);
        let trimPath = '';
        if (arrPath.length > 2) {
            trimPath = arrPath[1] + '/' + arrPath[2];
        } else {
            trimPath = arrPath[arrPath.length - 1];
        }
        let chosenHandler;
        if (typeof router[trimPath] === 'undefined') {
            // chosenHandler = notFoundRouting.showNotFound;
            res.end();
        } else {
            chosenHandler = router[trimPath];

            chosenHandler(req, res, arrPath[3]);
        }

    }
})

server.listen(8080,()=>{
    console.log("Server running on port 8080")
})