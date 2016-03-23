'use strict';

var app     = require('express')(),
	scraper = require('../index');

app.get('/fetch', function(req, res) {
	//req.selectors = [];
	scraper.fetch(req, res);
});

app.listen('1234', function(){
	console.log('Listening on port 1234');
});