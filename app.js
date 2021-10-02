const createError = require('http-errors');
const express = require('express');
const initialLoaders = require('./loader');

const indexRouter = require('./routes/index');

const app = express();

initialLoaders(app);

app.use('/', indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
