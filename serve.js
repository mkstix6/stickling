"use strict";
// Load the http module to create an http server.
// var http = require('http');

// // Configure our HTTP server to respond with Hello World to all requests.
// var server = http.createServer(function(request, response) {
//     response.writeHead(200, {
//         "Content-Type": "text/plain"
//     });
//     response.end("Hello World\n");
// });

// // Last, but not least, listen on port 8080
// server.listen(8080);

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function() {
    console.log('Server running on 8080...');
});