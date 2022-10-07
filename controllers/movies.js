const Movie = require('../models/movie');
const СustomError = require('../utils/customError');
const {
  NOT_OWNER_ERROR_TEXT,
  DATA_NOT_FOUND_TEXT,
  ERROR_403,
  ERROR_404,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  const _id = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
    owner: _id,
  })
    .then((data) => res.status(201).send({ data }))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .then((data) => {
      if (data && data.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId).then((delData) => {
          res.send({ delData });
        });
      }
      if (data && data.owner.toString() !== req.user._id) {
        return next(new СustomError(NOT_OWNER_ERROR_TEXT, ERROR_403));
      }

      return next(new СustomError(DATA_NOT_FOUND_TEXT, ERROR_404));
    })
    .catch((err) => next(err));
};
