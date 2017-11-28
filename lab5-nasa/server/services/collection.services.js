var config = require('../config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('collections');

var service = {};

service.create = create;
service.getUserCollections = getUserCollections;

module.exports = service;

function create(collectionParam) {
  var deferred = Q.defer();


  db.collections.insert(
    collectionParam,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}

function getUserCollections(_id) {
  var deferred = Q.defer();

  db.collections.find({user: _id}).toArray(function (err, collections) {

    if (err) deferred.reject(err.name + ': ' + err.message);

    // return users (without hashed passwords)
    collections = _.map(collections, function (collection) {
      return _.omit(collection, 'hash');
    });

    deferred.resolve(collections);
  });

  return deferred.promise;
}
//
// function getUserCollections(_id) {
//   var deferred = Q.defer();
//
//   db.collections.find({user: _id}).toArray(function (err, collections) {
//     if (err) deferred.reject(err.name + ': ' + err.message);
//     console.log('collections.find _id: collections', _id);
//     if (collections) {
//       // return user (without hashed password)
//       deferred.resolve(collections);
//     } else {
//       // user not found
//       deferred.resolve();
//     }
//   });
//
//   return deferred.promise;
// }
