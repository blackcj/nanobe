const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const utils = require('./utilities');
const rootPath = require('../../root.path');
const SimpleRouter = require('./simple.router');

class SimpleServer {
    constructor() {
        this.router = new SimpleRouter();
        this.staticFolder = '';
        this.server = http.createServer();
        this.callback;
        this.port;
        this.SimpleRouter = SimpleRouter;
    }

    use(routePath, router) {
        this.router.use(routePath, router);
    }

    // Relative to the server folder.
    setStaticFolder(folderPath) {
        this.staticFolder = folderPath;
    }

    addEventListeners(server) {
        server.on('request', (request, response) => {
            const parts = url.parse(request.url);
            const sanitizePath = path.normalize(parts.pathname).replace(/^(\.\.[\/\\])+/, '');

            let pathname = path.join(rootPath, this.staticFolder, sanitizePath);
            let isStaticFile = true;
            // check if the path exists
            if (this.staticFolder != '' && fs.existsSync(pathname)) {
                // if is a directory, then look for index.html
                if (fs.statSync(pathname).isDirectory()) {
                    pathname = path.join(pathname, '/index.html');
                }
            } else {
                isStaticFile = false;
                pathname = path.join(rootPath, sanitizePath);
            }
            pathname = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
            // check if the file exists
            if (isStaticFile && this.staticFolder != '' && fs.existsSync(pathname)) {
                this.sendFile(pathname, response);
            } else if (!this.router.route(sanitizePath, request, response)) {
                // console.log('Could not find', pathname);
                utils.sendResponse(response, "Not found", 404);
            }
        });

        server.on('listening', () => {
            // Used for auto refreshing the browser when JS code is modified
            if (process.send) {
                console.log(`Launching browser... http://localhost:${this.port}/`);
                process.send({ event: 'online', url: `http://localhost:${this.port}/` });
            }

            if (this.callback) {
                this.callback();
            }

        });

        server.on('error', (err) => {
            console.log(err);
        });
    }

    sendFile(pathname, response) {
        // read file from file system
        fs.readFile(pathname, (err, data) => {
            if (err) {
                console.log(err);
                utils.sendResponse(response, "Not found", 404);
            } else {
                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path.parse(pathname).ext;
                // Used for live refresh of the browser in development mode
                if (process.send && pathname.indexOf('index.html') >= 0) {
                    const bodyIndex = data.lastIndexOf('</body>');
                    const refreshScript = `<script src="${process.env.BROWSER_REFRESH_URL}"></script>`;
                    data = utils.insert(data.toString(), bodyIndex, refreshScript);
                }
                // if the file is found, send it
                utils.sendResponse(response, data, 200, { 'Content-Type': utils.mimetypes[ext] || 'text/plain' });
            }
        });
    }

    listen(port, callback) {
        this.port = port;
        this.callback = callback;
        this.addEventListeners(this.server, this.staticFolder);
        this.server.listen(port);
    }
}

module.exports = SimpleServer;