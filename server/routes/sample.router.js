const utils = require('../modules/utilities');
const SimpleRouter = require('./../modules/simple.router');
const router = new SimpleRouter();

router.addHandler('/', 'GET', (request, response) => {
    utils.parseQueryParams(request, query => {
        utils.sendResponse(response, { data: query }, 200, { 'Content-Type': 'application/json' });
    });
});

router.addHandler('/', 'POST', (request, response) => {
    utils.collectData(request, formattedData => {
        const data = { data: formattedData, message: 'Success' };
        utils.sendResponse(response, data, 201, { 'Content-Type': 'application/json' });
    });
});

module.exports = router;
