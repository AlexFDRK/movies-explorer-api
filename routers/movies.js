const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
  //   likeMovies,
  //   dislikeMovies,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', createMovie);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().min(24).max(24),
    }),
  }),
  deleteMovie,
);

module.exports = router;
