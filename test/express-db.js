var expect = require('expect.js'),
    edb = require('../lib/express-db');

describe('lib/express-db.js', function() {
    it('is an object', function() {
        expect(edb).to.be.an('object');
    });
});