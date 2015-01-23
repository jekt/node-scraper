'use strict';


var express = require('express'),
	app     = express(),
	scraper = require('./lib/scraper'),
	router	= require('./routes/api')(app);


app.listen('1234', function(){
	console.log('Listening on port 1234');
});

