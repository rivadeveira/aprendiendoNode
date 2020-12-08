const fs = require('fs')


const requestHandler = (req, res) => {
    const { url, method } = req
    if (url === '/') {
        res.write(`<html>
    <head><title>Enter message</title></head>
    <body>
        <form action="/message" method="POST">
            <input type="text" name="message" />
        </form>
    </body>
</html>`)   
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write(`<html>
    <head><title>My First Page</title></head>
    <body><h1>Hello from Node.js server!</h1></body>
</html>`)
    res.end()
}

//module.exports = requestHandler

/* module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
} */

/* module.exports.handler = requestHandler
module.exports.someText = 'Some hard coded text' */

exports.handler = requestHandler
exports.someText = 'Some hard coded text'