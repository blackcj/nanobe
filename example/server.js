const PORT = process.env.PORT || 5002;
const Nanobe = require('..');
const app = new Nanobe();
const colorRouter = require('./routes/color.router');

app.setStaticFolder('example/public');
app.use('/color', colorRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

module.exports = app.server;