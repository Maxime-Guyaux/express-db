var express = require('express'),
	app = express(),
	nodeDB = require('../lib/nodeDB'),
	server = require('http')
		.createServer(app)
		.listen(8081);

	app.use(nodeDB.init("demo DB"));

	app.get('/', function(req, res) {
		res.send("hello world!");
	});