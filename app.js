var express = require('express')
var app = express()

var foursquare = require('node-foursquare-venues')('35UH1ZRV1LML4OMHUNV2CISGII0GHFILV3Z1CHDBQB5WHIO1', '5NCVL2KJG5WDNS4KX2ZR5SVP3UDMFJNZL04LSHJLLDL5ZY0G')

app.get('/', function(req, res){
	var params = { 'll' : req.query.lat+','+req.query.lng}
	foursquare.venues.explore(params, function(err, data) {
		if (!err) {
			var venues = data["response"]["groups"][0]["items"]

			var minDistance = 9999
			var closestVenue = ''

			for (var i = 0; i < venues.length; i++) {
				var venue = venues[i].venue
				if (venue.location.distance < minDistance) {
					minDistance = venue.location.distance
					closestVenue = venue.name
				}
			}

			res.send(closestVenue)
		} else {
			res.send('Silly rabbit. You fucked up.')
		}
	})
})

var server = app.listen(5000, function() {
	console.log('Listening on port ' + server.address().port)
})