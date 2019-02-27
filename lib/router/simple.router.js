const utils = require('../utilities');

class Router {
    constructor() {
        this.routes = {};
        this.handlers = {};
    }

    use(routePath, router) {
        this.routes[routePath] = router;
    }

    addHandler(routePath, type, handler) {
        if (!this.handlers[routePath]) {
            this.handlers[routePath] = {};
        }
        this.handlers[routePath][type] = handler;
    }

    route(path, req, res) {
        const pathParts = path.split('/');
        let router;
        let handler;
        if (path === '') {
            if (this.handlers['/']) {
                // Found path, check for method (e.g. GET, POST, PUT, DELETE)
                handler = this.handlers[path][req.method];
            }
        } else if (this.handlers[path]) {
            // Found path, check for method (e.g. GET, POST, PUT, DELETE)
            handler = this.handlers[path][req.method];
        }
        if (handler) {            
            res.send = (data, status = 200) => {
                utils.sendResponse(res, data, status, { 'Content-Type': 'application/json' });
            }
            res.sendStatus = (status) => {
                utils.sendResponse(res, {}, status, { 'Content-Type': 'application/json' });
            }
            if (req.url) {
                req.query = utils.parseQueryParams(req);
            }
            if (typeof req.on === 'function' && req.method === 'POST' || req.method === 'PUT') {
                utils.collectData(req, body => {
                    req.body = body;
                    handler(req, res);
                });
            } else {
                handler(req, res);
            }
            return true;
        }
        let currentPath = '';
        let nextPath = '';
        for (const pathPart of pathParts) {
            if(pathPart == '') {
                // Do nothing
            } else if (router) {
                nextPath += '/' + pathPart;
            } else {
                currentPath += '/' + pathPart;
                router = this.routes[currentPath];
                // TODO: Handle route params
            }
        }
        if (path === '/' || path === '' || !router) {
            // We got here on an empty path, return false
            return false;
        } else if (nextPath === '') {
            return router.route('/', req, res);
        } else {
            return router.route(nextPath, req, res);
        }
    }
}

module.exports = Router;