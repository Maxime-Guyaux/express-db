var q = require('q'),
    nconf = require('nconf'),
    crud = require('./express-crud');

function _connect(filePath) {
    var deferred = q.defer(),
        promise = deferred.promise;

    nconf.file(filePath);
    nconf.load(function(err, db) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(crud.init(nconf));
        }
    });

    return promise;
}

module.exports = {
    connect: _connect
}