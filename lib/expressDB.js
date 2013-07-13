module.exports = {
	init: function(instanceName) {
		instanceName = instanceName || "nodeDB";
		return function(req, res, next) {
			if(/db/.test(req.url)) {
				console.log('<LOG> %s : DB query : %s', new Date().toString(), req.url);
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end(JSON.stringify({name:instanceName, version: "0.0.1", status: "OK"}));
			} else {
				next();
			}
		};
	},
	get: function() {},
	post: function() {}
	put: function() {}
	delete: function() {}
};