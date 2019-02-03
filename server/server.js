const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const utils = require('./utilities');
const sampleRouter = require('./routes/sample.router');
const PUBLIC_FOLDER = 'public';
const PORT = process.env.PORT || 5002;

console.log(process.env.dev);
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
    let pathname = path.join(__dirname, sanitizePath);

    // check if the path exists
    if (fs.existsSync(pathname)) {
        pathname = path.join(__dirname, PUBLIC_FOLDER, sanitizePath);
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
                // Used for live refresh of the browser in development mode
                if(process.send && pathname.indexOf('index.html') >= 0) {
                    const bodyIndex = data.lastIndexOf('</body>');
                    const refreshScript = `<script src="${process.env.BROWSER_REFRESH_URL}"></script>`;
                    data = utils.insert(data.toString(), bodyIndex, refreshScript);
                }
                // if the file is found, send it
                utils.sendResponse(response, data, 200, { 'Content-Type': utils.mimetypes[ext] || 'text/plain' });
            }
        });
    } else if (route) {
        route(request, response);
    } else {
        console.log('Could not find', pathname);
        utils.sendResponse(response, "Not found", 404);
    }
});

server.on('listening', function () {
    console.log('Listening to ', PORT);
    // Used for auto refreshing the browser when JS code is modified
    if (process.send) {
        console.log('Launching browser...');
        process.send({ event:'online', url:`http://localhost:${PORT}/` });
    }
});

server.on('error', function (err) {
    console.log(err);
});

server.listen(PORT);
