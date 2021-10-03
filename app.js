const express = require('express');
const initialLoaders = require('./loader');

const { NotFoundError } = require('./lib/errors');

const indexRouter = require('./routes/index');

const app = express();

initialLoaders(app);

app.use('/', indexRouter);

app.use(function (req, res, next) {
  next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    result: 'err',
    message: err.message,
  });
});

module.exports = app;
