'use strict';

var request = require('request'),
	cheerio = require('cheerio');

/**
 * Fetch the information from the URL specified in the request
 * @param {Object} req
 * @param {Object} res
 */
exports.fetch = function(req, res){
	var url = req.query.url;

	if (url === undefined) {
		return res.status(404).json({ error: 404, message: 'Error: please use ?url= to specify your URL.' });
	}

	request(url, function(error, response, html){
		if(error){
			return res.status(404).json({ error: 404, message: 'Error: ' + url + ' doesn\'t exist' });
		}
		return res.json(parseMetas(html, req.selectors));
	});
};

/**
 * Parse the meta tags in the HTML
 * @param {String} html
 * @param {Array} selectors
 */
function parseMetas (html, selectors){
	var temp = {},
		$ = cheerio.load(html);

		selectors = selectors ?
						selectors.map(function(sel){ return $(sel) }) :
					 	[$('head meta[name]'),					// Regular meta tags
						 $('head meta[property*="og:"]'),		// OG tags
						 $('head meta[property*="music:"]'),	// More OG tags
						 $('head meta[property*="video:"]'),	// More OG tags
						 $('head meta[property*="article:"]'),	// More OG tags
						 $('head meta[property*="book:"]'),		// More OG tags
						 $('head meta[property*="profile:"]'),	// More OG tags
						 $('head meta[property*="fb:"]'),		// Facebook app tags
						 $('head meta[property*="twitter:"]')];	// Twitter tags
	//console.log(selectors);
	for (var i=0, x=selectors.length; i<x; i++){
		if (selectors[i]) {
			selectors[i].each(function(j, el){
				var attr = el.attribs,
					key  = attr.property || attr.name;

				switch(typeof(temp[key])){
					case 'undefined':
						temp[key] = attr.content;
						break;
					case 'string':
						temp[key] = [temp[key]];
					default:
						temp[key].push(attr.content);
				}
			});
		}
	}
	return temp;
}