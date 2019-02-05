const utils = require('../modules/utilities');
const actions = {
    'GET': (request, response) => {
        utils.sendResponse(response, ['blue', 'green', 'yellow'], 200, { 'Content-Type': 'application/json' });
    },
};

module.exports = (request, response) => {
    const action = actions[request.method];
    if (action) {
        action(request, response);
    } else {
        utils.sendResponse(response, "Not Found", 404);
    }
};
