# Nanobe

Nanobe is a vanilla Node.js server with routing capabilities. It currently supports servering static files, routing, query parameters and post data. 

## Setup

- [Mocha](https://mochajs.org/) is required as a global dependency for running tests.
- `npm install` is required to install [Chai](https://www.chaijs.com/) for running tests.

### Testing

Run `npm test` to execute the tests.

## Features

- Request body parsed in `utilities.js`
- When requesting a folder, the server looks for `index.html` by default
- If a matching file is not found in the `public` folder, all routes are checked
- Unit testing for core features
- Ability to parse query parameters in `utilites.js`
- Support for nested routes and nested routers

## Future Plans

- [ ] Route parameters
- [ ] Additional testing
- [ ] Middleware support
- [ ] Security audit

## Resources

- https://adrianmejia.com/blog/2016/08/24/building-a-node-js-static-file-server-files-over-http-using-es6/
- https://medium.com/@grantspilsbury/dry-node-js-server-code-without-express-4db391a9ac60
- https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
- https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
- https://www.chaijs.com/plugins/chai-http/
