var nconf = require('nconf'),
    JSONSelect = require('JSONSelect');

module.exports = function(req, res, next) {
    this.db = {
        "blog": {
            "posts": [
                {"title": "lorem ipsum", "body": "lorem ipsum dolor sit amet", "published": "2014-03-13"},
                {"title": "lorem ipsum 2", "body": "lorem ipsum dolor sit amet 222", "published": "2014-03-14"},
                {"title": "lorem ipsum 3", "body": "lorem ipsum dolor sit amet 333", "published": "2014-03-15"}
            ]
        }
    };

    function query(selector) {
        return JSONSelect.match(selector, this.db);
    };

    // demo
    var q1 = query('.blog .posts :first-child');
    var q2 = query(':has(:root > .title:val("lorem ipsum 2"))');
    var q3 = query('.posts :nth-child(3)')
    console.log(q1);
    console.log(q2);
    console.log(q3);
};