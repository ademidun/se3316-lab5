var config = require('../config.json');
var express = require('express');
var router = express.Router();
var collectionService = require('../services/collection.services');

// routes
router.post('/create', register);
router.get('/user-collections/:_id', userCollections);
router.get('/:_id', getById);

router.put('/:_id', update);
router.get('/collections', getAll);

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

function getById(req, res) {
  console.log('collections.js getById req.params, req.headers', req.params, req.path);

  collectionService.getById(req.params._id)
    .then(function (collections) {
      console.log('collectionService.getById collections:', collections);
      res.status(200).send(collections);
    })
    .catch(function (err) {
      console.log('collectionService.getById err', err);
      res.status(400).send(err);
    });
}

function getAll(req,res){
  console.log('collections.js getAll req.params, req.headers', req.params, req.path);

  collectionService.getAll()
    .then(function (collections) {
      console.log('collectionService.getUserCollections collections:', collections);
      console.log('collectionService.getUserCollections res.status, foobar', res.status);
      res.status(200).send(collections);
    })
    .catch(function (err) {
      console.log('collectionService.getUserCollections err', err);
      res.status(400).send(err);
    });
}

function userCollections(req, res) {
  console.log('collections.js userCollections req.params, req.headers', req.params, req.path);

  collectionService.getUserCollections(req.params._id)
    .then(function (collections) {
      console.log('collectionService.getUserCollections collections:', collections);
      res.status(200).send(collections);
    })
    .catch(function (err) {
      console.log('collectionService.getUserCollections err', err);
      res.status(400).send(err);
    });
}


function update(req, res) {
  collectionService.update(req.params._id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

