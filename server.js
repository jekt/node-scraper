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
			var $ 	 = cheerio.load(html),
				json = JSON.stringify(fetchOGTags($), null, 4);
		}
		console.log(json);
        res.send(json);
	})
})

app.listen('1234', function(){
	console.log('Listening on port 1234');
});

function fetchOGTags($){
	var object = {};
	for (var i=0, array=$('head meta[property*="og:"]'), x=array.length; i<x; i++){
		object[array[i].attribs.property] = array[i].attribs.content;
	}
	return object;
}