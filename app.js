var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var httpLogger = require('morgan');


//var indexRouter = require('./routes/index');

import indexRouter  from './routes/index';
import usersRouter  from './routes/users';
import hitRouter from './routes/log';
import hitCounter from './classes/HitCounter'
import logger from './classes/Logger'

var app = express();



app.use(logger.getExpressLogger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/log', hitRouter)

module.exports = app;

// use this as the timer for logging every " second, 10 secs, minute"
setInterval(hitCounter.logAndReset, "1000")
