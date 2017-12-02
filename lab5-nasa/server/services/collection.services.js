var config = require('../config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var ObjectID = require('mongodb').ObjectID;
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('collections');

var service = {};

service.create = create;
service.getUserCollections = getUserCollections;
service.getById = getById;

service.getAll = getAll;

service.update = update;


service._delete = _delete;
service.filter = filter;

module.exports = service;

function create(collectionParam) {
  var deferred = Q.defer();


  db.collections.insert(
    collectionParam,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(doc);
    });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  db.collections.findById(_id, function (err, collections) {

    if (err) deferred.reject(err.name + ': ' + err.message);
    // return users (without hashed passwords)
    else {
      deferred.resolve(collections);
    }
  });

  return deferred.promise;
}


function getAll() {
  var deferred = Q.defer();

  db.collections.find({private_view: false}).toArray(function (err, collections) {
    console.log('db.collections.find({private_view: false}) collections:', collections);
    if (err) deferred.reject(err.name + ': ' + err.message);
    // return users (without hashed passwords)
    else {
      deferred.resolve(collections);
    }
  });

  return deferred.promise;
}

function filter(filterParams) {
  var deferred = Q.defer();

  db.collections.find(filterParams).toArray(function (err, collections) {

    if (err) deferred.reject(err.name + ': ' + err.message);
    // return users (without hashed passwords)
    else {
      console.log('filter Params, collections:',collections);
      deferred.resolve(collections);
    }
  });

  return deferred.promise;
}
function getUserCollections(_id) {
  var deferred = Q.defer();

  db.collections.find({user: _id}).toArray(function (err, collections) {

    if (err) deferred.reject(err.name + ': ' + err.message);
    // return users (without hashed passwords)
    else {
      deferred.resolve(collections);
    }
  });

  return deferred.promise;
}

function update(_id, collectionParam) {
  var deferred = Q.defer();

  console.log('collection.services.update _id, collectionParam:', _id, collectionParam);

  collectionParam = _.omit(collectionParam, '_id');
  db.collections.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: collectionParam },
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
    console.log('db.collections.update doc:', doc);

      console.log('db.collections.update doc.Response:', doc.message);

      if(doc.Response){
        console.log('db.collections.update doc.Response.documents:', doc.message.documents);
      }
      deferred.resolve();
    });


  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.collections.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
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
