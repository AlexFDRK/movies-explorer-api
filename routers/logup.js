const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/login');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ru'] },
        }),
      password: Joi.string().required().min(2),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

module.exports = router;
