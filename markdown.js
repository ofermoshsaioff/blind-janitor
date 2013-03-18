var marked = require('marked');
var fs = require('fs');

// give full path for file including the md extention
module.exports = function(file, callback) {
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) {
		console.log(err);
        return callback(err, null);
    }
	console.log(marked(data));
    return callback(null, marked(data));
  });
}