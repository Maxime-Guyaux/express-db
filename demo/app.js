var express = require('express'),
	app = express(),
	expressDB = require('../lib/expressDB'),
	server = require('http')
		.createServer(app)
		.listen(8081);

	app.use(expressDB.init("demo DB"));

	app.get('/', function(req, res) {
		res.send("hello world!");
	});
