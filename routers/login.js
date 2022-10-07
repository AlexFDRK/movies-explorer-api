const router = require('express').Router();
const { celebrate } = require('celebrate');
const { login } = require('../controllers/login');
const { loginSchema } = require('../utils/validator');

router.post(
  '/',
  celebrate({
    body: loginSchema,
  }),
  login,
);

module.exports = router;
