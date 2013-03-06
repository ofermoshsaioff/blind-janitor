var port = process.env.PORT || 8888;
var app = require('./app').init(port);

app.get('/', function (req, res) {
    res.send("Hello Blind Janitor");
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function (req, res) {
    console.log('got 404 request to ' + req.url);
    res.render('404.ejs', {
        layout: false
    });
});