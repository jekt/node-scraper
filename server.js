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
			var $ = cheerio.load(html);

			var json = { title : "", description : "", thumbnail : ""};

			json.title 		 = $('head meta[property="og:title"]').attr('content');
			json.description = $('head meta[property="og:description"]').attr('content');
			json.thumbnail 	 = $('head meta[property="og:image"]').attr('content');
		}

		console.log(JSON.stringify(json, null, 4));
        res.send(JSON.stringify(json, null, 4));
	})
})

app.listen('1234', function(){
	console.log('Listening on port 1234');
});