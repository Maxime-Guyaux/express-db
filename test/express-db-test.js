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
		'has a remove method': function(xdb) {
			assert.isFunction(xdb.remove);
		},
		'has a search method': function(xdb) {
			assert.isFunction(xdb.search);
		},
		'has a backup method': function(xdb) {
			assert.isFunction(xdb.backup);
		},
		'has a createView method': function(xdb) {
			assert.isFunction(xdb.createView);
		},
		'has a getViews method': function(xdb) {
			assert.isFunction(xdb.getViews);
		}
	},
	'the info method': {
		topic: xdb,
		'returns an object': function(xdb) {
			assert.isObject(xdb.info());
		},
		'returns an object with a version property': function(xdb) {
			assert.isTrue(xdb.info() && xdb.info().hasOwnProperty('version'));
		},
		'returns an object with a name property': function(xdb) {
			assert.isTrue(xdb.info() && xdb.info().hasOwnProperty('name'));
		}
	},
	'the get method': {},
	'the set method': {},
	'the remove method': {},
	'the search method': {},
	'the backup method': {},
	'the createView method': {},
	'the getViews method': {}
}).export(module);