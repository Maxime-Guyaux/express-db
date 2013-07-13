var express = require('express'),
	app = express(),
	expressDB = require('../lib/expressDB'),
	server = require('http')
		.createServer(app)
		.listen(8081);

app.use(expressDB.init("demo DB", {
	file: './bin/demo.db.json', //custom db file
	autoSave: true, //autosave enabled
	backupInterval: 60000 //interval in ms
}));

app.get('/', function(req, res) {
	res.send("hello world!");
	if(!expressDB.get('foo')) {
		expressDB.set('foo', 'bar');
		expressDB.backup(function() {
			console.log('foo is now set to : %s', expressDB.get('foo'));
		});
	} else {
		console.log('foo is already set to : %s', expressDB.get('foo'));
	}
});