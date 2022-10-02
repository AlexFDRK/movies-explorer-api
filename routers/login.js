const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/login');

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
    }),
  }),
  login,
);

module.exports = router;
