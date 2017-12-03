var config = require('../config.json');
var express = require('express');
var router = express.Router();
var userService = require('../services/user.services');


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);

router.get('/verify/:token', verify);
router.post('/reverify', reverify);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

router.get('/:_id', getAdmin);

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
  userService.create(req.body, req)
    .then(function (result) {
      console.log('THEN users.js, register, req',req.headers ,req.body);
      console.log(' users.js, register, result',result);
      res.status(200).send({'message': result});
    })
    .catch(function (err) {

      console.log('ERR ',err);
      res.status(400).send({message: err});
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

function getAdmin(req, res){
//adminID = 5a1db7ab8190c0134048f789

  userService.getById(req.params._id)
    .then(function (users) {
      console.log('getAdmin req.user, users', req.user, users);
      res.send(users);
    })
    .catch(function (err) {

      console.log('getAdmin err',err);
      res.status(400).send(err);
    });
}

function update(req, res) {
  userService.update(req.params._id, req.body)
    .then(function () {
      res.status(200).send(req.body);
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


function verify(req, res) {

  return userService.verify(req,res)
    .then(function (result) {
      console.log('user.js. verify result: ', result);
      res.status(200).send({body: result});
    })
    .catch(function (err) {
      console.log('user.js. verify err: ', err);
      res.status(400).send(err);
    });
}

function reverify(req, res) {

  return userService.reverify(req,res)
    .then(function (result) {
      console.log('user.js. reverify result: ', result);
      res.status(200).send({body: result});
    })
    .catch(function (err) {
      console.log('user.js. reverify err: ', err);
      res.status(400).send(err);
    });
}
