const PORT = process.env.PORT || 5002;
const SimpleServer = require('./modules/simple.server');
const app = new SimpleServer();
const sampleRouter = require('./routes/sample.router');
const colorRouter = require('./routes/color.router');

app.setStaticFolder('server/public');
app.use('/sample', sampleRouter);
app.use('/color', colorRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});