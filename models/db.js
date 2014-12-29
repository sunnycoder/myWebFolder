var setttings = require(../settings),
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;
module.exports = new Db(settings.db,new Server(setings.host,srttings.port),{safe:true});
	