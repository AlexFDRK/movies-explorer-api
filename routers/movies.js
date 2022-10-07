const router = require('express').Router();
const { celebrate } = require('celebrate');
const { movieBodySchema, movieDeleteSchema } = require('../utils/validator');
const {
  getMovies,
  createMovie,
  deleteMovie,
  //   likeMovies,
  //   dislikeMovies,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: movieBodySchema,
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: movieDeleteSchema,
  }),
  deleteMovie,
);

module.exports = router;
