const Movie = require("../models/movie");
const СustomError = require("../utils/customError");
const {
  MISSING_ID_ERROR_TEXT,
  NOT_OWNER_ERROR_TEXT,
  DATA_NOT_FOUND_TEXT,
  ERROR_403,
  ERROR_404,
} = require("../utils/constants");

module.exports.getMovies = (_req, res, next) => {
  Movie.find({})
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
        Movie.findByIdAndRemove(req.params.movieId).then((delData) => {
          res.send({ delData });
        });
      } else if (data && data.owner.toString() !== req.user._id) {
        next(new СustomError(NOT_OWNER_ERROR_TEXT, ERROR_403));
      } else {
        next(new СustomError(DATA_NOT_FOUND_TEXT, ERROR_404));
      }
    })
    .catch((err) => next(err));
};
