const router = require('express').Router();
const { celebrate } = require('celebrate');
const { logupSchema } = require('../utils/validator');
const { createUser } = require('../controllers/login');

router.post(
  '/',
  celebrate({
    body: logupSchema,
  }),
  createUser,
);

module.exports = router;
