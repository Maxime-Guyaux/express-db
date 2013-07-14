var express = require('express'),
	app = express(),
	xdb = require('../lib/express-db'),
	server = require('http')
		.createServer(app)
		.listen(8081);

app.use(xdb.init("demo DB", {
	file: './bin/demo.db.json', //custom db file, if necessary
	restrictAccess: true, //restrict access via browser
	autoSave: true, //autosave enabled
	backupInterval: 60000 //interval in ms
}));

app.get('/', function(req, res) {
	if(!xdb.get('foo')) {
		xdb.set('foo', 'bar');
		xdb.backup(function() {
			console.log('foo is now set to : %s', xdb.get('foo'));
		});
	} else {
		console.log('foo is already set to : %s', xdb.get('foo'));
	}

	xdb.search('posts', function(res) {
		console.log("search result: ", res);
	});

	res.end("hello world!");
});