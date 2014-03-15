var edb = require('../lib/express-db');

edb
    .connect('./bin/demo.db.json')
    .then(function(db) {
        console.log(db.find('string'));
    }, function(err) {
        console.log(err);
    });