const router = require('express').Router();
const { celebrate } = require('celebrate');
const { patchMeSchema } = require('../utils/validator');
const { getMe, patchMe } = require('../controllers/users');

router.get('/me', getMe);

router.patch(
  '/me',
  celebrate({
    body: patchMeSchema,
  }),
  patchMe,
);

module.exports = router;
