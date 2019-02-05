const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const chaiFiles = require('chai-files');
const expect = chai.expect;
const file = chaiFiles.file;

chai.should();
chai.use(chaiFiles);
chai.use(chaiHttp);

describe('test main server file', function () {
    it('should list ALL colors on /color GET', function (done) {
        chai.request(server)
            .get('/color')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('should 404 on a random page', function (done) {
        chai.request(server)
            .get('/somerandomlocation')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('should correctly download a *.js file', function (done) {
        chai.request(server)
            .get('/scripts/test.js')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.have.header('content-type', 'text/javascript');
                expect(file('server/public/scripts/test.js')).to.equal(res.text);
                done();
            });
    });
    it('should correctly download a *.html file', function (done) {
        chai.request(server)
            .get('/index.html')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.have.header('content-type', 'text/html');
                expect(file('server/public/index.html')).to.equal(res.text);
                done();
            });
    });
    it('should accept POST data', function (done) {
        chai.request(server)
            .post('/sample')
            .set('content-type', 'application/json')
            .send({ abc: '123' })
            .end((err, res) => {
                res.should.have.status(201);
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body.message).to.equal('Success');
                expect(res.body.data.abc).to.equal('123');
                done();
            });
    });
    it('should accept query parameters', function (done) {
        chai.request(server)
            .get('/sample?a=1&b=2')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.have.header('content-type', 'application/json');
                expect(res.body.data.a).to.equal('1');
                expect(res.body.data.b).to.equal('2');
                done();
            });
    });
    it('should NOT return files in the root directory', function (done) {
        chai.request(server)
            .get('/../../README.md')
            .end((err, res) => {
                res.should.have.status(404);
                expect(file('README.md')).to.not.equal(res.text);
                done();
            });
    });
    it('should NOT return server/server.js', function (done) {
        chai.request(server)
            .get('/../server/server.js')
            .end((err, res) => {
                res.should.have.status(404);
                expect(file('server/server.js')).to.not.equal(res.text);
                done();
            });
    });
});