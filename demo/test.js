var express = require('express'),
	app = express(),
	expressDB = require('../lib/expressDB');

app.use(expressDB.init("stress test DB", {
	file: './bin/test.db.json',
	autoSave: true
}));

var beginSet = new Date();
console.log("STARTED SET TEST: %s", beginSet.getTime().toString());
for(var i = 0; i < 100000; i++) {
	expressDB.set('test:'+i, i);
}
expressDB.backup(function() {
	var endSet = new Date();
	console.log("FINISHED SET TEST: %s", endSet.getTime().toString());
	console.log("100000 records set and backed up to file in : %s milliseconds", (endSet.getTime() - beginSet.getTime()).toString());
	setTimeout(function() {
		console.log("slept for 2 seconds");
		var beginGet = new Date();
		console.log("STARTED GET TEST: %s", beginGet.getTime().toString());
		for(var i = 0; i < 100000; i++) {
			expressDB.get('test:'+i, i);
		}
		var endGet = new Date();
		console.log("FINISHED GET TEST: %s", endGet.getTime().toString());
		console.log("100000 records get in : %s milliseconds", (endGet.getTime() - beginGet.getTime()).toString());
	}, 2000);
});
