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
	var object = {

		// General
		'ogTitle' 		: $('head meta[property="og:title"]').attr('content'),
		'ogDescription' : $('head meta[property="og:description"]').attr('content'),
		'ogUrl' 		: $('head meta[property="og:url"]').attr('content'),
		'ogDeterminer' 	: $('head meta[property="og:determiner"]').attr('content'),
		'ogSiteName' 	: $('head meta[property="og:site_name"]').attr('content'),

		// Type
		'ogType' 		: $('head meta[property="og:type"]').attr('content'),

		// Locale
		'ogLocale' 		: {
			'locale' 	: $('head meta[property="og:locale"]').attr('content'),
			'localeAlts'	: $('head meta[property="og:locale:alternate"]')
								.map(function(){return $(this).attr('content')})
								.get()
		},

		// Video
		'ogVideo' 		: {
			'url' 		: $('head meta[property="og:video"]').attr('content'),
			'secureUrl' : $('head meta[property="og:video:secure_url"]').attr('content'),
			'type' 		: $('head meta[property="og:video:type"]').attr('content'),
			'width' 	: $('head meta[property="og:video:width"]').attr('content'),
			'height' 	: $('head meta[property="og:video:height"]').attr('content')
		},

		// Audio
		'ogAudio' 		: {
			'url' 		: $('head meta[property="og:audio"]').attr('content'),
			'secureUrl' : $('head meta[property="og:audio:secure_url"]').attr('content'),
			'type' 		: $('head meta[property="og:audio:type"]').attr('content')
		},
	
		// Image 
		'ogImage'		: {
			'urls'		: ($('head meta[property="og:image"]') || $('head meta[property="og:image:url"]'))
								.map(function(){return $(this).attr('content')})
								.get(),
			'secureUrls': $('head meta[property="og:image:secure_url"]')
								.map(function(){return $(this).attr('content')})
								.get(),
			'type' 		: $('head meta[property="og:image:type"]').attr('content'),
			'width' 	: $('head meta[property="og:image:width"]').attr('content'),
			'height' 	: $('head meta[property="og:image:height"]').attr('content')
		}
	};

	return object;
}