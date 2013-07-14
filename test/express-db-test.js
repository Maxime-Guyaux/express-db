var vows = require('vows'),
	assert = require('assert'),
	xdb = require('../lib/express-db');

// xdb.init("vowsDB", {
// 	file: './bin/vows.db.json', //custom db file, if necessary
// 	restrictAccess: true, //restrict access via browser
// 	autoSave: false//, //autosave enabled
// 	//backupInterval: 60000 //interval in ms
// });

vows.describe('express-js').addBatch({
	'the module': {
		topic: xdb,
		'has a get method': function(xdb) {
			assert.isFunction(xdb.get);
		},
		'has a set method': function(xdb) {
			assert.isFunction(xdb.set);
		},
		'has a search method': function(xdb) {
			assert.isFunction(xdb.search);
		},
		'has a backup method': function(xdb) {
			assert.isFunction(xdb.backup);
		}
	}
}).export(module);