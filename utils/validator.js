const { Joi } = require('celebrate');

const logupSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru'] },
    }),
  password: Joi.string().required(),
  name: Joi.string().required().min(2).max(30),
});

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru'] },
    }),
  password: Joi.string().required(),
});

const movieBodySchema = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string()
    .required()
    .pattern(/(https?:\/\/)(w{3}\.)?(\w|-|_)*.[a-zA-Z]{2,3}(\w|\W)*/),
  trailerLink: Joi.string()
    .required()
    .pattern(/(https?:\/\/)(w{3}\.)?(\w|-|_)*.[a-zA-Z]{2,3}(\w|\W)*/),
  movieId: Joi.string().hex().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
  thumbnail: Joi.string()
    .required()
    .pattern(/(https?:\/\/)(w{3}\.)?(\w|-|_)*.[a-zA-Z]{2,3}(\w|\W)*/),
});

const movieDeleteSchema = Joi.object().keys({
  movieId: Joi.string().hex().required(),
});

const patchMeSchema = Joi.object().keys({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'ru'] },
  }),
  name: Joi.string().required().min(2).max(30),
});

module.exports = {
  movieBodySchema,
  movieDeleteSchema,
  loginSchema,
  logupSchema,
  patchMeSchema,
};
