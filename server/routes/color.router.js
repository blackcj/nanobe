const utils = require('../modules/utilities');
const SimpleRouter = require('./../modules/simple.router');
const router = new SimpleRouter();

router.addHandler('/', 'GET', (request, response) => {
    utils.sendResponse(response, ['blue', 'green', 'yellow'], 200, { 'Content-Type': 'application/json' });
});

module.exports = router;
