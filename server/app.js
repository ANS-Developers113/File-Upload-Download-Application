var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
const routefile=require('./routes/fileServer');
const mongoose=require('mongoose');

var app = express();
//your URL
mongoose.connect("mongodb+srv://[USERNAME]:[PASSWORD]@cluster0-p4slr.mongodb.net/[DATABSE NAME]?retryWrites=true&w=majority")
.then(()=> console.log("Mongodb Connected..."))
.catch((err)=> console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/upload',routefile);
app.use('/download',routefile);

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