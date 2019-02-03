const utils = require('./../utilities');
const actions = {
    'GET': (request, response) => {
        utils.sendResponse(response, 'Hello World!', 200, { 'Content-Type': 'text/plain' });
    },
    'POST': (request, response) => {
        utils.collectData(request, (formattedData) => {
            console.log('POST data', JSON.parse(formattedData));
            utils.sendResponse(response, 'Success', 200, { 'Content-Type': 'text/plain' });
        });
    }
};

module.exports = (request, response) => {
    const action = actions[request.method];
    if (action) {
        action(request, response);
    } else {
        utils.sendResponse(response, "Not Found", 404);
    }
};
