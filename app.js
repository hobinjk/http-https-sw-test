var https = require('https');
var http = require('http');

var fs = require('fs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

function startHttpsService() {
  // Create Express app, HTTP(S) server and WebSocket server
  var app = express();
  configApp(app, true);
  // HTTP server configuration
  var port = 4443;
  var options = {
    key: fs.readFileSync('privatekey.pem'),
    cert: fs.readFileSync('certificate.pem')
  };
  var server = https.createServer(options, app);

  // Start the HTTPS server
  server.listen(port, function() {
    console.log('Listening on port', server.address().port);
  });
}

function startHttpService() {
  var app = express();
  configApp(app, false);
  var port = 8080;
  var server = http.createServer(app);
  server.listen(port, function() {
    console.log('Listening on port', server.address().port);
  });
}

function configApp(app, https) {
  app.use(cors());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());   // Use bodyParser to access the body of requests
  app.use('/', express.static('static'));
  app.use('/whatever', function(req, res) {
    res.send('aich toot toot pah' + (https ? ' ess' : ''));
  });
}

startHttpService();
startHttpsService();
