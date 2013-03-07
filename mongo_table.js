var mongojs = require('mongojs');

module.exports = function(collection, options) {
  if (!collection) throw new Error('`collection` is required');
  options = options || {};
  var key = options.key || '_id';
  if (!key) throw new Error('`key` is required');
  if (options.cachepolicy) {
    console.warn('mongo-table ignores `options.cachepolicy`');
  }

  // ---

  var db = mongojs.connect('mongodb://admin:iwannabeadored@linus.mongohq.com:10028/BlindJanitor');
  var coll = db.collection(collection);

  var obj = {};

  obj.get = function(id, callback) {
    var query = {};
    query[key] = id;
    coll.findOne(query, function(err, item) {
      if (err) log('GET', id, 'ERROR:', err);
      else if (!item) log('GET', id, 'NOT FOUND');
      else log('GET', id, 'OK');

      return callback(err, item);
    });
  };

  obj.set = function(entity, callback) {
    coll.save(entity, function(err) {
      if (err) log('SET', entity[key], 'ERROR:', err);
      else log('SET', entity[key], 'OK');
      return callback(err);
    });
  };

  obj.scan = function(query, callback) {
    if (typeof query === 'function') {
      callback = query;
      query = {}
    }

    query = query || {};

    log('SCAN', JSON.stringify(query));

    var docs = [];
    coll.find(query).forEach(function(err, doc) {
      if (err) {
        log('SCAN', 'ERROR:', err.toString());
        return;
      }

      // reached the end of the resultset
      if (!doc) {
        return callback(null, docs);
      }

      docs.push(doc);
    });
  };

  obj.close = function() {
    db.close();
  }

  return obj;

  // -- private

  function log(action, params) {
    var args = [];
    args.push('MONGO-' + action);
    args.push(collection);
    for (var i = 1; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }
    console.log.apply(console, args);
  }
};