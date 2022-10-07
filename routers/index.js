const routes = require('express').Router();
const { auth } = require('../middlewares/auth');
const СustomError = require('../utils/customError');
const { ERROR_404_TEXT, ERROR_404 } = require('../utils/constants');

routes.use('/signup', require('./logup'));
routes.use('/signin', require('./login'));

routes.use(auth);

routes.use('/users', require('./users'));
routes.use('/movies', require('./movies'));

routes.use('*', (_req, res, next) => {
  next(new СustomError(ERROR_404_TEXT, ERROR_404));
});

module.exports = routes;
