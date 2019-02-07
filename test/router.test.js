const SimpleRouter = require('../server/modules/simple.router');
const chai = require('chai');
const expect = chai.expect;

describe('test router', () => {

    it('should correctly route to handler at /test', done => {
        const sampleRouter = new SimpleRouter();
        sampleRouter.addHandler('/test', 'GET', (req, res) => {
            expect(req.method).to.equal('GET');
            callbackWasRun = true;
        });
        const foundRoute = sampleRouter.route('/test', { method: 'GET' });
        expect(foundRoute).to.equal(true);
        expect(callbackWasRun).to.equal(true);
        done();
    });

    it('should correctly route to handler at /test/a', done => {
        const sampleRouter = new SimpleRouter();
        let callbackWasRun = false;
        sampleRouter.addHandler('/test/a', 'GET', (req, res) => {
            expect(req.method).to.equal('GET');
            callbackWasRun = true;
        });
        const foundRoute = sampleRouter.route('/test/a', { method: 'GET' });
        expect(foundRoute).to.equal(true);
        expect(callbackWasRun).to.equal(true);
        done();
    });

    it('should correctly route to nested router handler on /test', done => {
        const aRouter = new SimpleRouter();
        const bRouter = new SimpleRouter();
        let callbackWasRun = false;
        bRouter.addHandler('/test', 'GET', (req, res) => {
            expect(req.method).to.equal('GET');
            callbackWasRun = true;
        });
        aRouter.use('/test', bRouter);
        const foundRoute = aRouter.route('/test/test', { method: 'GET' });
        expect(foundRoute).to.equal(true);
        expect(callbackWasRun).to.equal(true);
        done();
    });

    it('should correctly route to nested router handler on /', done => {
        const aRouter = new SimpleRouter();
        const bRouter = new SimpleRouter();
        let callbackWasRun = false;
        bRouter.addHandler('/', 'GET', (req, res) => {
            expect(req.method).to.equal('GET');
            callbackWasRun = true;
        });
        aRouter.use('/test', bRouter);
        const foundRoute = aRouter.route('/test', { method: 'GET' });
        expect(foundRoute).to.equal(true);
        expect(callbackWasRun).to.equal(true);
        done();
    });

    it('should not route to extra path parts', done => {
        const aRouter = new SimpleRouter();
        const bRouter = new SimpleRouter();
        let callbackWasRun = false;
        bRouter.addHandler('/test', 'GET', (req, res) => {
            callbackWasRun = true;
        });
        aRouter.use('/test', bRouter);
        const foundRoute = aRouter.route('/test/test/test', { method: 'GET' });
        expect(foundRoute).to.equal(false);
        expect(callbackWasRun).to.equal(false);
        done();
    });

    it('should route correctly distinguish GET and POST', done => {
        const aRouter = new SimpleRouter();
        const bRouter = new SimpleRouter();
        let callbackWasRun = '';
        bRouter.addHandler('/test', 'GET', (req, res) => {
            callbackWasRun = 'GET';
        });
        bRouter.addHandler('/test', 'POST', (req, res) => {
            callbackWasRun = 'POST';
        });
        aRouter.use('/test', bRouter);
        let foundRoute = aRouter.route('/test/test', { method: 'POST' });
        expect(foundRoute).to.equal(true);
        expect(callbackWasRun).to.equal('POST');
        foundRoute = aRouter.route('/test/test', { method: 'GET' });
        expect(foundRoute).to.equal(true);
        expect(callbackWasRun).to.equal('GET');
        done();
    });
});