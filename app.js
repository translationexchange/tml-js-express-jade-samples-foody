var express       = require('express');
var path          = require('path');
var favicon       = require('static-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var tml           = require('tml-express');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(tml.init({
  // lets switch to staging - i will make the app open
  //host:   "https://staging-api.translationexchange.com",
  //key:    "f28dd49115a8d386966f63d369c923e76a06cd2c4c34cc157f00e790ef4e2427",
  //token:  "425000119f70bc555b67c6477010a28a0bbb3ecec2f52c75d436d5b68192b6b9",

  host:   "http://localhost:3000",
  key:    "2bd82fe3a5159cb0d8d4a47facbc26a73a4cd6be7e97719569bb71498a3b69a7",
  cdn_host: 'https://trex-snapshots-dev.s3-us-west-1.amazonaws.com',

  debug:  true,

  agent: {
    host:     "http://localhost:8282/dist/agent.js"
  },


  //
  //agent: {
  //  enabled:  true,
  //  type:     "tools",
  //  version:  "0.1.7",
  //  domains:  {
  //    api:   "https://staging-api.translationexchange.com",
  //    tools: "https://staging-translation-center.translationexchange.com"
  //  }
  //},

  //cache: {
  //  adapter: "memcache",
  //  hosts: ["localhost:11211"],
  //  namespace: "f28dd49115a8d386966f63d369c923e76a06cd2c4c34cc157f00e790ef4e2427"
  //},

  cache: {
    adapter: "memcache",
    hosts: ["localhost:11211"],
    version_check_interval: 30
  }

  //cache: {
  //  adapter: "redis",
  //  host: "localhost",
  //  port: 6379,
  //  namespace: "e0a9d6d247e1586a43ba9edf2bd09b199406ec91114f0e10684ecba0d94452ea"
  //}

  //current_locale: 'fr',
  //current_locale: function(request) {
  //  return 'fr';
  //},

  //current_source: function() {
  //  window.location......
  //}


  // DYNAMIC SOURCES - BASED on PATH or CLASS NAME


  //current_source: {
  //  "recipe\\/[\\d]+$": 'current'
  //}
  //
  //current_source: function(request) {
  //  if (request.url.indexOf('profile/')) {
  //    return 'profile/view';
  //  }
  //  // return utils.normalizeSource(request.url);
  //},
  //
  //current_source: "BLA",
  //
  //current_source: {
  //  'recipe/:id': 'recipe/view'
  //},

  //current_user: function(request) {
  //  return;
  //}
}));

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
