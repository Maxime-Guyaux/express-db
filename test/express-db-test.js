var vows = require('vows'),
	assert = require('assert'),
	xdb = require('../lib/express-db');

xdb.init("vows DB", {
	file: './bin/vows.db.json', //custom db file, if necessary
	restrictAccess: true, //restrict access via browser
	autoSave: false, //autosave enabled
	//backupInterval: 60000 //interval in ms
	viewCaching: true //cache views then requested
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
			assert.include(xdb.info(), 'version');
		},
		'returns an object with a name property': function(xdb) {
			assert.include(xdb.info(), 'name');
		}
	},
	'the get method': {
		topic: xdb,
		'can get a value from the database': function(xdb) {
			assert.equal(xdb.get('foo'), 'bar');
		}
	},
	'the set method': {
		topic: xdb,
		'can set a value': function(xdb) {
			xdb.set('lorem', 'ipsum');
			assert.equal(xdb.get('lorem'), 'ipsum');
		},
		'can update a value': function(xdb) {
			xdb.set('foo', 'baz');
			assert.equal(xdb.get('foo'), 'baz');
		}
	},
	'the remove method': {
		topic: xdb,
		'can remove a value': function(xdb) {
			xdb.remove('foo');
			assert.isFalse(xdb.get('foo'));
		}
	},
	'the search method': {
		topic: xdb,
		'can find comments for a specific page id': function(xdb) {
			xdb.search('stats.comments_lookup[{stats.page.id}]', function(res) {
				assert.isObject(res);
				assert.isArray(res.value);
				assert.equal(res.key, 'page_1');
				assert.equal(res.value[0].id, 'comment_1');
			});
		}
	},
	//'the backup method': {},
	'the createView method': {
		topic: xdb,
		'can create a query view': function(xdb) {
			xdb.createView('comments', 'stats.comments_lookup[{stats.page.id}]');
			assert.isString(xdb.getViews()['comments']['query']);
			assert.equal(xdb.getViews()['comments']['query'], 'stats.comments_lookup[{stats.page.id}]');
			assert.isNull(xdb.getViews()['comments']['cache']);
		}
	},
	'the getViews method': {
		topic: xdb,
		'can return a list of views': function(xdb) {
			xdb.createView('comments', 'stats.comments_lookup[{stats.page.id}]');
			assert.isObject(xdb.getViews());
			assert.include(xdb.getViews(), 'comments');
		}
	}
}).export(module);