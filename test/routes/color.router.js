const SimpleRouter = require('../..').Router;
const router = new SimpleRouter();
const colors = ['Yellow', 'Purple', 'Orange'];

router.addHandler('/', 'GET', (request, response) => {
    response.send(colors);
});

router.addHandler('/query', 'GET', (request, response) => {
    response.send({ data: request.query });
});

router.addHandler('/', 'POST', (request, response) => {
    colors.push(request.body.color);
    const data = { data: request.body, message: 'Success' };
    response.send(data, 201);
});

module.exports = router;