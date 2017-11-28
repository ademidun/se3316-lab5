var config = require('../config.json');
var express = require('express');
var router = express.Router();
var collectionService = require('../services/collection.services');

// routes
router.post('/create', register);
router.get('/user-collections/:_id', userCollections);

module.exports = router;

function register(req, res) {

  console.log('collections.js register req, req.headers', req.path);
  collectionService.create(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {

      console.log('ERR ',err);
      res.status(400).send(err);
    });
}


function userCollections(req, res) {
  console.log('collections.js userCollections req.params, req.headers', req.params, req.path);

  collectionService.getUserCollections(req.params._id)
    .then(function () {
      console.log('collectionService.getUserCollections res.status, foobar', res.status);
      res.sendStatus(200);
    })
    .catch(function (err) {
      console.log('collectionService.getUserCollections err', err);
      res.status(400).send(err);
    });
}


