[![Build Status](https://travis-ci.org/stephanepericat/express-db.png?branch=master)](https://travis-ci.org/stephanepericat/express-db)

#express-db 0.0.2#

A lightweight local key-value store that integrates with your express.js application.

**WARNING** This module is in very early stage of development. Serious issues, like performance, scalability or security may occur. Use at your **OWN RISK**!
If you want to help improve express-db, feel free to contribute by forking and sending pull requests!

##Installation##

[![NPM](https://nodei.co/npm/express-db.png)](https://nodei.co/npm/express-db/)

##Usage##

###Create you own db file###

The first thing to do is to create your own db file for backup. It will need to be a json file, with the following default structure:

	{
	  "info": {
	    "version": "0.0.2",
	    "name": "demo DB"
	  },
	  "data": {

	  }
	}

'version' should be set to the version of express-db you are using, and 'name' should be the name of you db.

You will then need to define it in the express-db constructor:

	xdb.init("my custom DB", {
		file: './my.custom.db.json'
	});

###Integrate with express.js 3.x###

	var express = require('express'),
		app = express(),
		xdb = require('express-db'),
		server = require('http')
			.createServer(app)
			.listen(8081);

	app.use(xdb.init("demo DB", {
		file: './db/demo.db.json', //your db file
		restrictAccess: false, //restrict access via browser
		autoSave: true, //autosave enabled
		backupInterval: 60000, //interval in ms,
		viewCaching: true //cache views then requested
	}));

###API Reference###

####init(dbname, options)####

the init method, to be passed to express for hook.

*Options*:

 + file: (*required*) path to your own db file
 + restrictAccess: (*optional*) true or false, restricts the access to the db on the client side
 + autoSave: (*optional*) enables automatic backup of the databse
 + backupInterval: (*optional*) the frequency (in ms) of backups
 + viewCaching: (*optional*) true or false, caches the view result on browser call

*Example*:

	xdb.init("demo DB", {
		file: './db/demo.db.json', //your db
		restrictAccess: false, //restrict access via browser
		autoSave: true, //autosave enabled
		backupInterval: 60000, //interval in ms,
		viewCaching: true //cache views then requested
	});

####info()###

Returns info on the current database.

	xdb.info() // => {"version" : "0.0.2", "name": "demo DB"}

####get(key)####

Gets the value for a given key.

	xdb.get('foo'); // => 'bar'

####set(key, value)####

Sets a value for a give key.

	xdb.set('foo', 'bar');

####remove(key)####

Removes a given key.

	xdb.remove('foo');

####backup(callback)####

Forces an immediate backup to file of the current database.

	xdb.backup(function(err) {
		if(err) throw err;
		else console.log('DB backed up at %s', new Date().toString());
	});

####search(query)####

Search through the JSON structure. Read the [json-query documentation](https://github.com/mmckegg/json-query/blob/master/README.md) for more details on query possibilities.

	xdb.search('stats.comments_lookup[{stats.page.id}]', function(res) {
		console.log("search result: ", res);
	});

####createView(name, query)####

Creates a view exposbale to the client side of the express.js application. Query system is also based on [json-query](https://github.com/mmckegg/json-query/blob/master/README.md).

	xdb.createView('comments', 'stats.comments_lookup[{stats.page.id}]');

####getViews()####

Returns the views defined for the current database.

	xdb.getViews(); // => {'comments': {'query': 'stats.comments_lookup[{stats.page.id}]', cache: null}, ...}

##Test##

	npm test

##Performance##

Tested on MacBook Air (1.7 Ghz Intel Core i5, 4Gb 1600Mhz DDR3):

	STARTED SET TEST: 1373816191605
	FINISHED SET TEST: 1373816192791
	100,000 records set in : 1186 milliseconds
	slept for 2 seconds
	STARTED GET TEST: 1373816194793
	FINISHED GET TEST: 1373816195584
	100,000 records get in : 791 milliseconds

You can run the test on your own computer by typing: `node demo/test.js`

##License##

The MIT License (MIT)

Copyright (c) 2013 Stephane P. Pericat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
