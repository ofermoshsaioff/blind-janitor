var port = process.env.PORT || 8888;
var app = require('./app').init(port);
var db = require('./mongo_table');

// this needs to be async
app.get('/', function (req, res) {
  var review = db('reviews');
  review.scan(function(err, items) {
	if (err) throw err;  
  res.render('index', {'albums': items});
  });
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function (req, res) {
    console.log('got 404 request to ' + req.url);
    res.render('404', {
        layout: false
    });
});
/*
function get_albums() {
	res = [];
	res.push({artist: "The Stone Roses", album: "The Stone Roses", img: "Stoneroses.jpg"});
	res.push({artist: "Crosby, Stills & Nash", album: "Crosby, Stills & Nash", img: "Crosbystillsandnash.jpg"});
	res.push({artist: "The Who", album: "Who's Next", img: "Whosnext.jpg"});
	res.push({artist: "Blind Melon", album: "Blind Melon", img: "BlindMelonBlindMelon.jpg"});
	res.push({artist: "Lemonheads", album: "It's a shame about Ray", img: "Lemonheads_It's_a_Shame_About_Ray.jpg"});
	res.push({artist: "Madseason", album: "Above", img: "Mad-Season-above.jpg"});
	res.push({artist: "Primal Scream", album: "Screamadelica", img: "Screamadelica.jpg"});
	res.push({artist: "Hot Chip", album: "In Our Heads", img: "HotChip-InOurHeads.jpg"});
	res.push({artist: "Chromatics", album: "Kill For Love", img: "Chromatics_-_Kill_for_Love.jpg"});
	return res;
}
*/