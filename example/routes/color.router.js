const Router = require('../..').Router;
const router = new Router();

router.addHandler('/', 'GET', (request, response) => {
    response.send(['Yellow', 'Purple', 'Orange']);
});

module.exports = router;
