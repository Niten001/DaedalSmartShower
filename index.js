var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response) {
    console.log(request.url);
    if (request.url == "/") {
        fs.readFile('./index.html', function(err, data) {
            response.setHeader('Content-type', 'text/html');
            response.write(data);
            response.end();
        });
    } else {
        fs.readFile('./' + request.url, function(err, data) {
            if (!err) {
                var dotoffset = request.url.lastIndexOf('.');
                var mimetype = dotoffset == -1
                                ? 'text/plain'
                                : {
                                    '.html' : 'text/html',
                                    '.ico' : 'image/x-icon',
                                    '.jpg' : 'image/jpeg',
                                    '.png' : 'image/png',
                                    '.gif' : 'image/gif',
                                    '.css' : 'text/css',
                                    '.js' : 'text/javascript',
                                    '.ttf' : 'font/ttf',
                                    '.woff2' : 'font/woff2',
                                    '.woff' : 'font/woff',
                                    '.eot' : 'font/eot',
                                    '.svg' : 'image/svg+xml',
                                    '.map' : 'text-plain'
                                    }[ request.url.substr(dotoffset) ];
                response.setHeader('Content-type' , mimetype);
                response.end(data);
            } else {
                response.writeHead(404, "Not Found");
                response.end();
            }
        });
    }
}).listen(8080);