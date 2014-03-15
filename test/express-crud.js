var expect = require('expect.js'),
    edb = require('../lib/express-crud');

describe('lib/express-crud.js', function() {
    it('is an object', function() {
        expect(edb).to.be.an('object');
    });
});