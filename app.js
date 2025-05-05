const createError = require('http-errors');
const express = require('express');
const { join } = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// Import Routers
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const app = express();

// Middleware
app.use([
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  express.static(join(__dirname, 'public')),
]);

// Routes
app.use('/api', usersRouter);
app.use('/books', booksRouter);

// 404 Handler
app.use((req, res, next) => next(createError(404)));

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
