var express = require('express')
var app = express()

var foursquare = require('node-foursquare-venues')('35UH1ZRV1LML4OMHUNV2CISGII0GHFILV3Z1CHDBQB5WHIO1', '5NCVL2KJG5WDNS4KX2ZR5SVP3UDMFJNZL04LSHJLLDL5ZY0G')

app.get('/', function(req, res){
	var params = { 'll' : req.query.lat+','+req.query.lng}
	foursquare.venues.explore(params, function(err, data) {
		var venues = data["response"]["groups"][0]["items"]

		var venueNames = []

		for (var i = 0; i < venues.length; i++) {
				venueNames.push(venues[i].venue.name)
			}

		res.send(venueNames)
	})
})

var server = app.listen(5000, function() {
	console.log('Listening on port ' + server.address().port)
})