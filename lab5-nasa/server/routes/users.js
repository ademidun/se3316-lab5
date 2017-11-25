var config = require('../config.json');
var express = require('express');
var router = express.Router();
var userService = require('../services/user.services');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function authenticate(req, res) {
  userService.authenticate(req.body.email, req.body.password)
    .then(function (user) {
      if (user) {
        // authentication successful
        console.log('users.js, succesuful authenticate,',user);
        res.status(200).send(user);
      } else {
        // authentication failed
        res.status(400).send('email or password is incorrect');
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function register(req, res) {

  console.log('users.js register req, req.headers', req.headers, req.body, req.path);
  userService.create(req.body)
    .then(function () {
      console.log('THEN users.js, register, req',req.headers ,req.body);
      res.sendStatus(200);
    })
    .catch(function (err) {

      console.log('ERR ',err);
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  userService.getAll()
    .then(function (users) {
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getCurrent(req, res) {
  userService.getById(req.user.sub)
    .then(function (user) {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function update(req, res) {
  userService.update(req.params._id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  userService.delete(req.params._id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
