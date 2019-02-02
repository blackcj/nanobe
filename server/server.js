const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const utils = require('./utilities');
const sampleRouter = require('./routes/sample.router');
const PUBLIC_FOLDER = 'public';
const PORT = process.env.PORT || 5002;

// Add routers here
const routes = {
    '/sample': sampleRouter,
    // '/temperature': temperatureRouter
};

const server = http.createServer();

server.on('request', (request, response) => {
    const parts = url.parse(request.url);
    const route = routes[parts.pathname];
    const sanitizePath = path.normalize(parts.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath, PUBLIC_FOLDER);

    // check if the path exists
    if (fs.existsSync(pathname)) {
        // if is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }
    }
    // check if the file exists
    if (fs.existsSync(pathname)) {
        // read file from file system
        fs.readFile(pathname, function (err, data) {
            if (err) {
                console.log(err);
                utils.sendResponse(response, "Not found", 404);
            } else {
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path.parse(pathname).ext;
                // if the file is found, send it
                utils.sendResponse(response, data, 200, { 'Content-Type': utils.mimetypes[ext] || 'text/plain' });
            }
        });
    } else if (route) {
        route(request, response);
    } else {
        utils.sendResponse(response, "Not found", 404);
    }
});

server.on('listening', function () {
    console.log('Listening to ', PORT);
});

server.on('error', function (err) {
    console.log(err);
});

server.listen(PORT);
