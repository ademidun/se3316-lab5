var config = require('../config.json');
var express = require('express');
var router = express.Router();
var collectionService = require('../services/collection.services');

// routes
router.post('/create', create);
router.post('/filter', filter);
router.get('/user-collections/:_id', userCollections);

router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', _delete);


router.get('', getAll);

module.exports = router;

function create(req, res) {

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

function _delete(req, res) {
  collectionService._delete(req.params._id)
    .then(function () {
      console.log('collectionService._delete res.body:', res.body);
      console.log('collectionService._delete req.body:', req.body);
      res.status(200).send(res);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}


function filter(req,res){
  console.log('collections.js filter req.body, req.path', req.body, req.path);

  collectionService.filter(req.body)
    .then(function (collections) {
      console.log('collectionService.filter collections:', collections);
      console.log('collectionService.filter res.status, ', res.status);
      res.status(200).send(collections);
    })
    .catch(function (err) {
      console.log('collectionService.getUserCollections err', err);
      res.status(400).send(err);
    });
}

function update(req, res) {
  collectionService.update(req.params._id, req.body)
    .then(function (result) {
      //console.log('collectionService.update res:', res);
      console.log('collectionService.update res.body:', res.body);
      console.log('collectionService.update req.body:', req.body);
      console.log('collectionService.update result:', result);
      res.status(200).send(req.body);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}


