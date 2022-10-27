const http = require('http')
const url = require('url')
const handler = require('./controller/router')
const notFoundRouting = require('./controller/handle/notFoundRouting')
const blankRouting = require('./controller/handle/blankRouting')

function getUrl(req) {
    const urlParse = url.parse(req.url, true)
    const pathName = urlParse.pathname
    return pathName.split('/')
}

const server = http.createServer((req, res) => {
    const arrPath = getUrl(req)
    let trimPath = ''
    if (arrPath.length > 2) {
        trimPath = arrPath[1] + '/' + arrPath[2]
    } else {
        trimPath = arrPath[arrPath.length - 1]
    }
    let chosenHandle
    if (typeof handler[trimPath] === 'undefined') {
        chosenHandle = notFoundRouting.showNotFound
    } else {
        chosenHandle = handler[trimPath]
    }
    chosenHandle(req, res, +arrPath[3])
})

server.listen(8080, () => {
    console.log("Server running on port 8080")
})

