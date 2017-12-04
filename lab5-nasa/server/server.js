// mongod --dbpath /Users/tomiwaademidun/Desktop/tomiwa/codeproj/practice/se-3316-webtech/oademid-se3316-lab5/lab5-nasa/server/data
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//require('rootpath')();
var expressJwt = require('express-jwt');
var config = require('./config.json');
// Get our API routes
const api = require('../server/routes/api');
const users = require('../server/routes/users');
const collections = require('../server/routes/collections');
const app = express();


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static('dist'));

// Set our api routes
//app.use('/api', api);

app.use('',expressJwt({
  secret: config.secret,
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({ path: ['/users/authenticate', '/users/register','/users',/\/users\/verify\/.+/,
  '/collections', /\/collections\/.+/, '/users/5a1db7ab8190c0134048f789'] }));

app.use('/users', users);

app.use('/collections', collections);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
