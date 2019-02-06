class SimpleRouter {
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
        let router;
        let pathParts = path.split('/');
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
            // Found a matching handler, call the function
            handler(req, res);
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

module.exports = SimpleRouter;