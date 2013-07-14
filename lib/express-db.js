var nconf = require('nconf'),
	colors = require('colors'),
	jsonQuery = require('json-query'),
	dbStorage = nconf.use('file', {file: './bin/db.json'}),
	instanceName,
	searchContext,
	views = {},
	viewCache = true,
	restrictedAccess = false,
	autoSave = false,
	backupInterval = 300000;

//load the db
dbStorage.load();

//private methods
function enableAutosave(backupInterval) {
	setInterval(function() {
		dbStorage.save(function(err) {
			if(err) {
				sendLog('error', 'express-db save error : %s', err.toString());
			} else {
				sendLog('log', 'express-db : %s saved successfully', instanceName.green);
			}
		});
	}, backupInterval);
};

function sendLog(msgType, msg /*, arg1, arg 2,... arg N*/) {
	var type = msgType,
		str,
		args = [];

	switch(type) {
		case "log":
			str = '[LOG] :: '.blue + new Date().toString().grey + ' :: express-db (' + instanceName.green + ') :: '.grey + msg.grey; 
		break;
		case "error":
			str = '[ERROR] :: '.red.bold + new Date().toString().grey + ' :: express-db (' + instanceName.green + ') :: '.grey + msg.red; 
		break;
		default:
			str = '[LOG] :: '.blue + new Date().toString().grey + ' :: express-db (' + instanceName.green + ') :: '.grey + msg.grey; 
		break;
	}

	args.push(str);

	if(arguments.length > 2) {
		for(var i = 2; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
	}
	console.log.apply(this, args);
}

//module
module.exports = {
	init: function(iName, options) {
		if(options && options.file) {
			dbStorage = nconf.use('file', {file: options.file});
			dbStorage.load();
		}

		instanceName = (iName) ? iName : "expressDB";
		searchContext = dbStorage.get('data');
		restrictedAccess = (options && options.restrictAccess) ? options.restrictAccess : false;
		viewCache = (options && options.viewCaching) ? options.viewCaching : true;

		autoSave = (options && options.autoSave) ? options.autoSave : true;
		if(autoSave) {
			backupInterval = (options && options.backupInterval) ? options.backupInterval : 300000; //default is every 5 minutes
			enableAutosave(backupInterval);
		}

		if(!dbStorage.get('info:name') || (instanceName !== dbStorage.get('info:name'))) {
			dbStorage.set('info:name', instanceName);
			dbStorage.save(function() {
				sendLog('log', 'expressDB db name set to: %s', instanceName);
			});
		}
		
		return function(req, res, next) {
			if(/db/.test(req.url)) {
				if('/db' === req.url) {
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(JSON.stringify({name:instanceName, version: "0.0.1", status: "OK"}));
				} else {
					if(restrictedAccess) {
						//close external db access
						res.writeHead(403, {'Content-Type': 'application/json'});
						res.end(JSON.stringify({"express-db": "access forbidden"}));
					} else {
						if(/\/db\/view\//.test(req.url)) {
							var viewName = /\/db\/view\/(.*)/.exec(req.url);
							if(viewName && viewName[1] && views[viewName[1]]) {
								var viewQuery = jsonQuery(views[viewName[1]].query, {rootContext: searchContext}),
									viewData = (viewQuery && viewQuery.value) ? viewQuery.value : {};

								if(viewCache) {
									views[viewName[1]].cache = (viewQuery && viewQuery.value) ? viewQuery.value : null;
								}

								res.writeHead(200, {'Content-Type': 'application/json'});
								res.end(JSON.stringify({"view": {"name": viewName[1], "data": viewData}}));
							} else {
								res.writeHead(404, {'Content-Type': 'application/json'});
								res.end(JSON.stringify({"express-db": "not found"}));
							}
						} else {
							res.writeHead(404, {'Content-Type': 'application/json'});
							res.end(JSON.stringify({"express-db": "not found"}));
						}
					}
				}

				sendLog('log', 'express-db query : %s', req.url.yellow);
			} else {
				next();
			}
		};
	},

	info: function() {
		return (dbStorage.get('info')) ? dbStorage.get('info') : {};
	},

	get: function(key) {
		var value = dbStorage.get('data:' + key);
		return (value) ? value : false;
	},

	set: function(key, value) {
		dbStorage.set('data:' + key, value);
		return true;
	},

	remove: function(key, callback) {
		dbStorage.clear('data:' + key, callback);
	},

	backup: function(callback) {
		dbStorage.save(callback);
	},

	search: function(query, callback) {
		var searchResult = jsonQuery(query, {rootContext: searchContext});
		callback.call(this, searchResult);
	},

	createView: function(viewName, query) {
		views[viewName] = {
			query: query,
			cache: null
		};
		return true;
	},

	getViews: function() {
		return views;
	}
};