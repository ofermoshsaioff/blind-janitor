var port = process.env.PORT || 8888,
    app = require('./app').init(port),
	markdown = require('./markdown'),
	reviews = require('./reviews.json'),
	async = require('async');


var reviews_arr = [];
for (key in reviews) {
  reviews_arr.push(reviews[key]);
}
  
app.get('/', function (req, res) {  
  res.render('index', {'albums': reviews, 'controller':'home'});  
});

app.get('/reviews/:name', function (req, res) {
  var path = 'reviews/' + req.params.name+ '/index.md';	
  markdown(path, function (err, result) {
    res.render('review', {'body':result, 'details':reviews[req.params.name]});
  });
});

/* Gets the list of writers from the reviews.json file TODO -- need to handle duplicate names (maybe reduce?) */
app.get('/writers', function (req, res) {
  function iterator(item, callback) {
    callback(null, item.reviewer);
  }	
  async.map(reviews_arr, iterator, function(err, results) {
  
  function filter_duplicates(arr) {
    filtered_arr = results.filter(function(elem, pos) {
      return results.indexOf(elem) == pos;
  });
  return filtered_arr;
  }
  res.render('writers', {'writers': filter_duplicates(results), 'controller':'writers'}); 
  });
});

/* Gets the list of reviews for this writer's name */
app.get('/writers/:name', function (req, res) {
  function iterator(item, callback) {	
    callback(item.reviewer == req.params.name);
  }	
  async.filter(reviews_arr, iterator, function(results) {
    res.render('reviews', {'albums': results, 'reviewer': req.params.name}); 
  });
});

app.get('/about', function (req, res) {
  res.render('about', {'controller':'about'});
});
	
app.get('/search?(:q)?', function (req, res) {
  function iterator(item, callback) {
    function is_substring(str, sub) {
	  return (str.toLowerCase().indexOf(sub) !== -1);
	}  
    callback(is_substring(item.album, req.query.q) || is_substring(item.artist, req.query.q) || is_substring(item.reviewer, req.query.q));
  }
  async.filter(reviews_arr, iterator, function(results) {
    res.render('reviews', {'albums': results, 'reviewer': req.query.q});
  });
});
		

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function (req, res) {
  console.log('got 404 request to ' + req.url);
  res.render('404', {
    layout: false
  });
});
