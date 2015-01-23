'use strict';

var request = require('request'),
	cheerio = require('cheerio');

exports.fetch = function(req, res){
	var url = req.query.url;

	if (url === undefined) {
		console.log('What do you want me to do exactly? Use ?url= to specify your URL.');
	}

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html), json = {};

			parseMetas($('head meta[name]'), json); 				// Regular meta tags
			parseMetas($('head meta[property*="og:"]'), json); 		// OG tags
			parseMetas($('head meta[property*="music:"]'), json); 	// More OG tags
			parseMetas($('head meta[property*="video:"]'), json); 	// More OG tags
			parseMetas($('head meta[property*="article:"]'), json); // More OG tags
			parseMetas($('head meta[property*="book:"]'), json); 	// More OG tags
			parseMetas($('head meta[property*="profile:"]'), json); // More OG tags
			parseMetas($('head meta[property*="fb:"]'), json);		// Facebook app tags
			parseMetas($('head meta[property*="twitter:"]'), json); // Twitter tags
		}
		console.log('Something AWESOME happenned on your page => check it out!');
        return res.json(json);
	})
};

function parseMetas (selector, object){
	selector.each(function(i, el){
		var attr = el.attribs,
			key  = attr.property || attr.name;

		switch(typeof(object[key])){
			case 'undefined':
				object[key] = attr.content;
				break;
			case 'string':
				object[key] = [object[key]];
			default:
				object[key].push(attr.content);
		}
	});
}