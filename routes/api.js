'use strict';

var express = require('express'),
	app     = express(),
	scraper = require('../lib/scraper');

module.exports = function (app) {
	app.get('/fetch', scraper.fetch);
};