var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var tml = require('tml-express');

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
    key: "81ec0081ab76a408dede88e7597962aa4a84a158e6f862d7d2d4e1ce75fa6a7a",
    cache: {
        adapter: "memcache",
        hosts: ["localhost:11211"],
        version_check_interval: 30
    }

    /*

     - Redis Cache Example

     cache: {
         adapter: "redis",
         host: "localhost",
         port: 6379
     }

     - Dynamic Locale Settings Options

     current_locale: 'fr',

     current_locale: function(request) {
       return 'fr';
     },

     - Dynamic Source Examples

     current_source: {
        "recipe\\/[\\d]+$": 'current'
     }

     current_source: function(request) {
        if (request.url.indexOf('profile/')) {
           return 'profile/view';
        }
       // return utils.normalizeSource(request.url);
      },

     current_source: "ru",

     - Current User Extraction

     current_user: function(request) {
      return;
     }
   */

    // for development only
    // host: "http://localhost:3000",
    // key: "2bd82fe3a5159cb0d8d4a47facbc26a73a4cd6be7e97719569bb71498a3b69a7",
    // cdn_host: 'https://trex-snapshots-dev.s3-us-west-1.amazonaws.com',
    // debug: true,
    // agent: {
    //     host: "http://localhost:8282/dist/agent.js"
    // }
}));

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
