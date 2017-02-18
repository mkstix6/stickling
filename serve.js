var connect = require('connect')
var serveStatic = require('serve-static')

connect().use(
    serveStatic('/index.html')
).listen(8080)
