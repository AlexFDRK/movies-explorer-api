const User = require('../models/user');
const СustomError = require('../utils/customError');
const { MISSING_ID_ERROR_TEXT, ERROR_404 } = require('../utils/constants');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user)
    .then((data) => {
      if (!data) {
        next(new СustomError(MISSING_ID_ERROR_TEXT, ERROR_404));
      } else {
        res.send({ data });
      }
    })
    .catch((err) => next(err));
};

module.exports.patchMe = (req, res, next) => {
  const { name } = req.body;
  const _id = req.user;

  User.findByIdAndUpdate(
    _id,
    { name},
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        next(new СustomError(MISSING_ID_ERROR_TEXT, ERROR_404));
      }
    })
    .catch((err) => next(err));
};