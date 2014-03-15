var expect = require('expect.js'),
    edb = require('../lib/express-db');

describe('lib/express-db.js', function() {
    it('is a function', function() {
        expect(edb).to.be.a('function');
    });
});