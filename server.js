const fs = require('fs')
const http = require('http')
const querystring = require('querystring')
const port = process.env.PORT || 1337
const server = http.createServer( (req, res) => {
    const { url } = req
    if (url == '/') return respondText(req, res)
    if (url == '/json') return respondJSON(req, res)
    if (url.match(/^\/echo/)) return respondEcho(req, res)
    if (url.match(/^\/static/)) return respondStatic(req, res)
    return respondNotFound(req, res)
})

const respondText = (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

const respondJSON = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text: 'hi', numbers: [ 1,2,3 ]}))
}

const respondEcho = (req, res) => {
    const {input = ''} = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(
        {
            normal: input, 
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: [...input].reverse().join('')
        }
    ))
}

const respondStatic = (req, res) => {
    const filename = `${__dirname}/public${req.url.split('/static')[1]}`
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res)
}

const respondNotFound = (req, res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('Not Found')
}

server.listen(port)
console.log(`Server listening on port ${port}`)