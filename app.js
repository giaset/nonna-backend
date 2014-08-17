var express = require('express')
var app = express()

var foursquare = require('node-foursquare-venues')('35UH1ZRV1LML4OMHUNV2CISGII0GHFILV3Z1CHDBQB5WHIO1', '5NCVL2KJG5WDNS4KX2ZR5SVP3UDMFJNZL04LSHJLLDL5ZY0G')
var wikipedia = require('wikipedia-js')

app.get('/', function(req, res){
	res.send('#nonnaknowseverything');
});

app.get('/knows', function(req, res){
	var params = { 'll' : req.query.lat+','+req.query.lng}
	foursquare.venues.explore(params, function(err, data) {
		if (!err) {
			var responseObjects = data["response"]["groups"][0]["items"]
			var venues = []

			for (var i = 0; i < responseObjects.length; i++) {
				var venue = responseObjects[i].venue
				venues.push({ 'name' : venue.name, 'distance' : venue.location.distance })
			}

			res.send(venues)

			/*var options = { query: venues[0].name, format: 'html', summaryOnly: true }
			wikipedia.searchArticle(options, function(err, wikiDescription) {
				if (!err) {
					venues[0].description = wikiDescription
					res.send(venues)
				}
			})*/

		} else {
			res.send('Silly rabbit. You fucked up.')
		}
	})
})

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log('Listening on port ' + port);
});