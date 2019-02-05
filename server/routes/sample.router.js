const utils = require('../modules/utilities');
const actions = {
    'GET': (request, response) => {
        utils.parseQueryParams(request, query => {
            utils.sendResponse(response, { data: query }, 200, { 'Content-Type': 'application/json' });
        })
    },
    'POST': (request, response) => {
        utils.collectData(request, (formattedData) => {
            const data = {data: formattedData, message: 'Success'};
            utils.sendResponse(response, data, 201, { 'Content-Type': 'application/json' });
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
