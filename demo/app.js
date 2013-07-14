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
	backupInterval: 60000, //interval in ms,
	viewCaching: true //cache views then requested
}));

//set
xdb.set('foo', 'bar');
//get
console.log('foo ? %s', xdb.get('foo'));
//remove
xdb.remove('foo', function(err) {
	console.log('is foo still here ? %s', xdb.get('foo'));
});
//search for the comments for page id 'page_1'
xdb.search('stats.comments_lookup[{stats.page.id}]', function(res) {
	console.log("search result: ", res);
});
//create view
xdb.createView('blogposts', 'posts');
xdb.createView('comments', 'stats.comments_lookup[{stats.page.id}]');
//get views
console.log(xdb.getViews());

// express stuff
app.get('/', function(req, res) {
	res.end("hello world!");
});