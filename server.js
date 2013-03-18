var port = process.env.PORT || 8888,
    app = require('./app').init(port),
	markdown = require('./markdown');


app.get('/', function (req, res) {
  res.render('index', {'albums': []});  
});

app.get('/reviews/:name', function (req, res) {
	var path = 'reviews/' + req.params.name+ '/index.md';	
	markdown(path, function (err, result) {
	  if (err) {		
		res.send(err);
	  }
	  res.render('review', {'body':result});
	});
});
		

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function (req, res) {
    console.log('got 404 request to ' + req.url);
    res.render('404', {
        layout: false
    });
});
