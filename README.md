# Vanilla Node.js Server

Node modules tend to be a black hole. This is a bare-bones Node.js server with routing that doesn't require any node modules. It first looks for static files and then looks at routes. If nothing is found, a 404 status is returned.

## Setup

### Global Dependencies

A few global dependencies are needed to allow for live reload and JavaScript imports on the client.

- node
- [browserify](https://www.npmjs.com/package/browserify)
- [watch](https://www.npmjs.com/package/watch)
- [browser-refresh](https://www.npmjs.com/package/browser-refresh)

### Starting the Project

- `npm run client` _to start watching files in the `src` directory_
- `npm run server` _to start the auto loading server_

## Features

- Request body parsed in `utilities.js`
- When requesting a folder, the server looks for `index.html` by default
- If a matching file is not found in the `public` folder, all routes are checked

## Future Plans

- [ ] Additional testing
- [ ] Middleware support
- [ ] Security audit

## Resources

- https://adrianmejia.com/blog/2016/08/24/building-a-node-js-static-file-server-files-over-http-using-es6/
- https://medium.com/@grantspilsbury/dry-node-js-server-code-without-express-4db391a9ac60
- https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
- https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
