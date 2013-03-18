var express = require('express'),
	partials = require('express-partials');
var app = express();

exports.init = function (port) {
    app.configure(function () {
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.logger());
		// load the express-partials middleware
		app.use(partials());
        app.use(express.static(__dirname + '/public'));
		app.use('/reviews', express.static(__dirname + '/reviews'));		
        app.use(app.router);
        app.enable("jsonp callback");
    });


    app.configure('development', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
        app.use(express.logger({
            format: ':method :url'
        }));
    });

    app.configure('production', function () {
        app.use(express.errorHandler());
    });

    app.use(function (err, req, res, next) {
        res.render('500.ejs', {            
            status: 500
        });
    });

    app.listen(port);

    console.log("Listening on port %d in %s mode", port, app.settings.env);

    return app;
}