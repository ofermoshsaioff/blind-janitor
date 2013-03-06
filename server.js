var port = process.env.PORT || 8888;
var app = require('./app').init(port);

// this needs to be async
app.get('/', function (req, res) {
   albums = get_albums();
   res.render('index', {albums: albums});
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function (req, res) {
    console.log('got 404 request to ' + req.url);
    res.render('404', {
        layout: false
    });
});

function get_albums() {
	res = [];
	res.push({artist: "The Stone Roses", album: "The Stone Roses", img: "Stoneroses.jpg"});
	res.push({artist: "Crosby, Stills & Nash", album: "Crosby, Stills & Nash", img: "Crosbystillsandnash.jpg"});
	res.push({artist: "The Who", album: "Who's Next", img: "Whosnext.jpg"});
	res.push({artist: "Blind Melon", album: "Blind Melon", img: "BlindMelonBlindMelon.jpg"});
	return res;
}