const mongoose = require('mongoose');

function emailValidator(val) {
  const regex = /(\w|-|\.)+@(\w)+.[a-zA-Z]{2,3}/;
  return regex.test(val);
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Поле 'email' - не заполнено"],
    unique: [true, "Поле 'email' - не уникально"],
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, "Поле 'Пароль' - не заполнено"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "Поле 'Имя' - не заполнено"],
    minlength: [2, "Длина поля 'Имя пользователя' менее 2 символов"],
    maxlength: [30, "Длина поля 'Имя пользователя' более 30 символов"],
  },
});

userSchema.set('toJSON', {
  transform(doc, ret) {
    const rett = ret;

    delete rett.password;
    return rett;
  },
});

module.exports = mongoose.model('user', userSchema);
