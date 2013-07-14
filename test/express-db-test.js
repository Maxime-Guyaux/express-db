var vows = require('vows'),
	assert = require('assert'),
	xdb = require('../lib/express-db');

xdb.init("vows DB", {
	file: './bin/vows.db.json', //custom db file, if necessary
	restrictAccess: true, //restrict access via browser
	autoSave: false//, //autosave enabled
	//backupInterval: 60000 //interval in ms
});

vows.describe('express-db').addBatch({
	'the express-db module': {
		topic: xdb,
		'is an object': function(xdb) {
			assert.isObject(xdb);
		},
		'has an init method': function(xdb) {
			assert.isFunction(xdb.init);
		},
		'has an info method': function(xdb) {
			assert.isFunction(xdb.info);
		},
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
	},
	'the info method': {
		topic: xdb,
		'returns an object': function(xdb) {
			assert.isObject(xdb.info());
		},
		'has a version property': function(xdb) {
			assert.isTrue(xdb.info() && xdb.info().hasOwnProperty('version'));
		},
		'has a name property': function(xdb) {
			assert.isTrue(xdb.info() && xdb.info().hasOwnProperty('name'));
		}
	}
}).export(module);