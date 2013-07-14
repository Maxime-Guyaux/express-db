#express-db 0.0.1#

A simple local key-value store that integrates with your express.js application.<br/><br/>
<b>warning</b> This module is in very early stage of development. Serious issues, like performance, scalability or security may occur. use at your own risk!<br/>If you want to help improve express-db, feel free to contribute by forking and sending pull requests!

##Installation##

	npm install express-db

##Usage##

###Integrate with express.js 3.x###

	var express = require('express'),
		app = express(),
		xdb = require('../lib/express-db'),
		server = require('http')
			.createServer(app)
			.listen(8081);

	app.use(xdb.init("demo DB", {
		file: './bin/demo.db.json', //custom db file, if necessary
		restrictAccess: false, //restrict access via browser
		autoSave: true, //autosave enabled
		backupInterval: 60000, //interval in ms,
		viewCaching: true //cache views then requested
	}));

###API Reference###

####init(options)####

the init method, to be passed to express for hook.<br/>
Options:
 - file: (<i>optional</i>) path to your own db file
 - restrictAccess: (<i>optional</i>) true or false, restricts the access to the db on the client side
 - autoSave: (<i>optional</i>) enables automatic backup of the databse
 - backupInterval: (<i>optional</i>) the frequency (in ms) of backups
 - viewCaching: (<i>optional</i>) true or false, caches the view result on browser call

##Test##

	npm test

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