var nconf = require('nconf'),
    JSONSelect = require('JSONSelect');

module.exports = function(req, res, next) {
    this.db = {
        "blog": {
            "posts": [
                {"title": "lorem ipsum", "body": "lorem ipsum dolor sit amet", "published": "2014-03-14"},
                {"title": "lorem ipsum 2", "body": "lorem ipsum dolor sit amet 222", "published": "2014-03-15"}
            ]
        }
    };

    function query(selector) {
        return JSONSelect.match(selector, this.db);
    };

    // demo
    var q = query('.blog .posts :first-child');
    console.log(this.db, q);

};