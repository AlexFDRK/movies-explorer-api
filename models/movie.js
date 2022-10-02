const mongoose = require('mongoose');

function linkValidator(val) {
  const regex = /(https?:\/\/)(w{3}\.)?(\w|-|_)*.[a-zA-Z]{2,3}(\w|\W)*/;
  return regex.test(val);
}

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Поле 'Страна' - не заполнено"],
  },
  director: {
    type: String,
    required: [true, "Поле 'Режиссёр' - не заполнено"],
  },
  duration: {
    type: Number,
    required: [true, "Поле 'Длительность фильма' - не заполнено"],
  },
  year: {
    type: Number,
    required: [true, "Поле 'Год' - не заполнено"],
  },
  description: {
    type: String,
    required: [true, "Поле 'Описание фильма' - не заполнено"],
  },
  image: {
    type: String,
    required: [true, "Поле 'Cсылка на постер' - не заполнено"],
    validate: linkValidator,
  },
  trailerLink: {
    type: String,
    required: [true, "Поле 'Cсылка на трейлер' - не заполнено"],
    validate: linkValidator,
  },
  thumbnail: {
    type: String,
    required: [true, "Поле 'Миниатюрное изображение постера' - не заполнено"],
    validate: linkValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "Поле 'Владелец' - не заполнено"],
  },
  nameRU: {
    type: String,
    required: [true, "Название фильма RU' - не заполнено"],
  },
  nameEN: {
    type: String,
    required: [true, "Название фильма EN' - не заполнено"],
  },
});

module.exports = mongoose.model('movie', movieSchema);
