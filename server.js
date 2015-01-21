var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
	url = req.query.url;

	if (url === undefined) {
		console.log('What do you want me to do exactly? Use ?url= to specify your URL.');
	}

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html), json = {};

			parseMetas($('head meta[name]'), json); 				// Regular meta tags
			parseMetas($('head meta[property*="og:"]'), json); 		// OG tags
			parseMetas($('head meta[property*="twitter:"]'), json); // Twitter tags
		}
		console.log('Something AWESOME happenned on your page => check it out!');
        res.json(json);
	})
})

app.listen('1234', function(){
	console.log('Listening on port 1234');
});

function parseMetas (selector, object){
	selector.each(function(i, el){
		object[(el.attribs.property || el.attribs.name)] = el.attribs.content;
	});
};