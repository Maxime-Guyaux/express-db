var express = require('express'),
	app = express(),
	xdb = require('../lib/express-db'),
	server = require('http')
		.createServer(app)
		.listen(8081);

app.use(xdb.init("demo DB", {
	file: './bin/demo.db.json', //custom db file, if necessary
	restrictAccess: false, //restrict access via browser
	autoSave: true, //autosave enabled
	backupInterval: 60000 //interval in ms
}));

//set
xdb.set('foo', 'bar');
//get
console.log('foo ? %s', xdb.get('foo'));
//remove
xdb.remove('foo', function(err) {
	console.log('is foo still here ? %s', xdb.get('foo'));
});
//search
xdb.search('posts', function(res) {
	console.log("search result: ", res);
});
//create view
xdb.createView('blogposts', 'posts');
//get views
console.log(xdb.getViews());

// express stuff
app.get('/', function(req, res) {
	res.end("hello world!");
});