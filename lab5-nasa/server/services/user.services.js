var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.verify = verify;
service.reverify = reverify;

module.exports = service;

function create(userParam, req) {
  var deferred = Q.defer();

  // validation
  db.users.findOne(
    {email: userParam.email},
    function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user) {
        // email already exists
        deferred.reject('email "' + userParam.email + '" is already taken');
      } else {
        createUser(req);


      }
    });


  function createUser(req) {
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');

    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    //add verification token
    // Create a verification token for this user
    user.verificationToken = crypto.randomBytes(16).toString('hex');


    db.users.insert(
      user,
      function (err, doc) {
        if (err) {
          console.log('errokc', err);
          console.log('inserting user into the db user, doc:', user, doc);
        }
        // Send the email
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {user: 'tomiademidun@gmail.com', pass: 'kjdtnwidxjewwhxp'}
        });
        var mailOptions = {
          from: 'no-reply@lab5nasacom', to: user.email, subject: 'Account Verification Token',
          text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +
          '\/users\/verify\/' + user.verificationToken + '.\n'
        };

        transporter.sendMail(mailOptions, function (err) {

          console.log('sending the email', transporter);
          if (err) {
            console.log('errokc 2', err);
          }
          console.log('success', transporter);
          deferred.resolve('A verification email has been sent to ' + user.email + '.');

        });
      });
  }

  return deferred.promise;
}

function authenticate(email, password) {
  var deferred = Q.defer();

  db.users.findOne({email: email}, function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user && bcrypt.compareSync(password, user.hash)) {
      // authentication successful
      user.token = jwt.sign({sub: user._id}, config.secret);
      deferred.resolve(user);
    } else {
      // authentication failed
      deferred.resolve();
    }
  });
  console.log('deferred', deferred);
  return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();

  db.users.find().toArray(function (err, users) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    // return users (without hashed passwords)
    users = _.map(users, function (user) {
      return _.omit(user, 'hash');
    });

    deferred.resolve(users);
  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  db.users.findById(_id, function (err, user) {
    console.log('users.findById user:', user);
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user) {
      // return user (without hashed password)
      deferred.resolve(_.omit(user, 'hash'));
    } else {
      // user not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}


function update(_id, userParam, message) {
  var deferred = Q.defer();
  message = message || 'Succesful update.';
  // validation
  db.users.findById(_id, function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user.email !== userParam.email) {
      // email has changed so check if the new email is already taken
      db.users.findOne(
        {email: userParam.email},
        function (err, user) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          if (user) {
            // email already exists
            deferred.reject('email "' + req.body.email + '" is already taken')
          } else {
            updateUser();
          }
        });
    } else {
      updateUser();
    }
  });

  function updateUser() {
    // fields to update


    userParam['token'] = jwt.sign({sub: userParam._id}, config.secret);


    // update password if it was entered
    if (userParam.password) {
      userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    userParam._id = mongo.helper.toObjectID(_id);
    db.users.update(
      {_id: mongo.helper.toObjectID(_id)},
      {$set: userParam},
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(message);
      });
  }

  return deferred.promise;
}

function verify(req, res) {
  var deferred = Q.defer();
  // https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
  console.log('user.services.verify req.params:', req.params);
  if (!req.params.token) deferred.reject({
    type: 'not-verified',
    msg: 'We were unable to find a valid token. Your token my have expired.'
  });

  // If we found a token, find a matching user
  db.users.findOne({verificationToken: req.params.token}, function (err, user) {
    if (!user) deferred.reject({msg: 'We were unable to find a user for this token.'});
    //if (user.isVerified) deferred.resolve({type: 'already-verified', msg: 'This user has already been verified.'});

    // Verify and save the user
    else {
      const alreadyVerified = user.isVerified;
      user.isVerified = true;

      db.users.update(
        {_id: mongo.helper.toObjectID(user._id)},
        {$set: user},
        function (err, doc) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          deferred.resolve({ msg: "The account has been verified. Please log in.",
            is_already_verified:alreadyVerified });
        });

    }
  });
  return deferred.promise;
}

function reverify(req, res) {

  console.log('user.services.verify req.body:', req.body);
  var deferred = Q.defer();

  //https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
  db.users.findOne({email: req.body.email}, function (err, user) {
    if (!user) deferred.reject({msg: 'We were unable to find a user with that email.'});
    if (user.isVerified) deferred.reject({msg: 'This account has already been verified. Please log in.'});

    // Create a verification token, save it, and send email
    user.verificationToken = crypto.randomBytes(16).toString('hex');

    db.users.update(
      {_id: mongo.helper.toObjectID(user._id)},
      {$set: user},
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // Send the email
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {user: 'tomiademidun@gmail.com', pass: 'kjdtnwidxjewwhxp'}
        });
        var mailOptions = {
          from: 'no-reply@lab5nasacom', to: user.email, subject: 'Account Verification Token',
          text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +
          '\/users\/verify\/' + user.verificationToken + '.\n'
        };

        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            deferred.reject({msg: err.message});
          }

          deferred.resolve('A verification email has been sent to ' + user.email + '.');

        });
      });

  });

  return deferred.promise;
}


function _delete(_id) {
  var deferred = Q.defer();

  db.users.remove(
    {_id: mongo.helper.toObjectID(_id)},
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}
