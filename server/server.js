const PORT = process.env.PORT || 5002;
const SimpleServer = require('./modules/simple.server');
const app = new SimpleServer();
const colorRouter = require('./routes/color.router');

app.setStaticFolder('server/public');
app.use('/color', colorRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

module.exports = app.server;