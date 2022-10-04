const jwt = require('jsonwebtoken');
const { ERROR_401 } = require('../utils/constants');
const СustomError = require('../utils/customError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new СustomError('Неуспешная авторизация', ERROR_401));
  }

  const token = authorization.replace('Bearer ', '');

  //   const { cookies } = req;

  //   if (!cookies) {
  //     return next(new СustomError('Неуспешная авторизация', ERROR_401));
  //   }
  // //  const token = cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new СustomError('Ошибочный токен', ERROR_401));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
