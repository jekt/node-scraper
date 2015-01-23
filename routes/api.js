'use strict';

var scraper = require('../lib/scraper');

module.exports = function (app) {
	app.get('/fetch', scraper.fetch);
};