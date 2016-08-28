var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// apiai SDK
var apiai = require('apiai');

// validations on startup
if (process.env.MU_SPARQL_ENDPOINT === undefined) {
  throw new Error('Environment variable MU_SPARQL_ENDPOINT is missing');
}
if (process.env.MU_APPLICATION_GRAPH === undefined) {
  throw new Error('Environment variable MU_APPLICATION_GRAPH is missing');
}
if (process.env.APIAI_ACCESS_TOKEN === undefined) {
  throw new Error('Environment variable APIAI_ACCESS_TOKEN is missing');
}

// create Express app
var app = express();

// set application-wide variables
app.locals.graph = process.env.MU_APPLICATION_GRAPH;
app.locals.sessionIdHeader = 'MU_SESSION_ID';
app.locals.rewriteUrlHeader = 'X_REWRITE_URL';
app.locals.apiaiApp = apiai(process.env.APIAI_ACCESS_TOKEN);

// app configuration
app.use(logger('dev'));
app.use(bodyParser.json( { type: function(req) { return /^application\/vnd\.api\+json/.test(req.get('content-type')); } } ));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routing
var routes = require('./routes/index');
app.use('/', routes);

// set JSONAPI content type
app.use('/', function(req, res, next) {
  res.type('application/vnd.api+json');
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      errors: [ {title: err.message} ]
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
