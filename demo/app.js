var express = require('express'),
	app = express(),
	expressDB = require('../lib/expressDB'),
	server = require('http')
		.createServer(app)
		.listen(8081);

	app.use(expressDB.init("demo DB"));

	// var begin = new Date();
	// console.log("STARTED SET TEST: %s", begin.getTime().toString());
	// for(var i = 0; i < 100000; i++) {
	// 	expressDB.set('test:'+i, i);
	// }
	// expressDB.backup(function() {
	// 	var end = new Date();
	// 	console.log("FINISHED SET TEST: %s", end.getTime().toString());
	// 	console.log("100000 records set and backed up to file in : %s milliseconds", (end.getTime() - begin.getTime()).toString());
	// });


	app.get('/', function(req, res) {
		res.send("hello world!");
	});
