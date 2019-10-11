var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose= require('mongoose')
var sql = require('mssql');
const url=require('./config/config')
var socket = require('socket.io');
var app = express();
var io = socket();
app.io = io;


mongoose.connect(url.url,{useNewUrlParser: true}).then(()=>{
  console.log('ket noi thanh cong')
})

var indexRouter = require('./routes/index')(io);
var usersRouter = require('./routes/users');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/project',require('./routes/project'))
app.use('/work',require('./routes/work'))
app.use('/chat',require('./routes/chat'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
