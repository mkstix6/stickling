var connect = require('connect')
var serveStatic = require('serve-static')

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
