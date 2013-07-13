var express = require('express'),
	app = express(),
	expressDB = require('../lib/expressDB'),
	server = require('http')
		.createServer(app)
		.listen(8081);

	app.use(expressDB.init("demo DB"));

	console.log("DB info: ", expressDB.info());

	app.get('/', function(req, res) {
		res.send("hello world!");
		// expressDB.backup(function(err) {
		// 	if (err) throw err;
		// 	else console.log('db is backed up');
		// });
	});
