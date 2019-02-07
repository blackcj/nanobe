const utils = require('./../../server/modules/utilities');
const SimpleRouter = require('./../../server/modules/simple.router');
const router = new SimpleRouter();
const colors = ['blue', 'green', 'yellow'];

router.addHandler('/', 'GET', (request, response) => {
    utils.sendResponse(response, colors, 200, { 'Content-Type': 'application/json' });
});

router.addHandler('/query', 'GET', (request, response) => {
    utils.parseQueryParams(request, query => {
        utils.sendResponse(response, { data: query }, 200, { 'Content-Type': 'application/json' });
    });
});

router.addHandler('/', 'POST', (request, response) => {
    utils.collectData(request, formattedData => {
        colors.push(formattedData.color);
        const data = { data: formattedData, message: 'Success' };
        utils.sendResponse(response, data, 201, { 'Content-Type': 'application/json' });
    });
});

module.exports = router;