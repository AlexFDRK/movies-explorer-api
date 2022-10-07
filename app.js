const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const helmet = require('helmet');

const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const { catchErrors } = require('./controllers/errors');

const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];

const { limiter } = require('./utils/limiter');

require('dotenv').config();

app.use(requestLogger); // DDOS shield
app.use(helmet()); // eader correction

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
} else {
  mongoose.connect(process.env.DB_CONN);
}

app.use(
  cors({
    origin: allowedCors,
    credentials: true,
  }),
);

app.use(limiter);

app.use('/', require('./routers/index'));

app.use(errorLogger);
app.use(errors());
app.use(catchErrors);

app.listen(PORT, () => {
  //  console.log(`App listening on port ${PORT}`);
});
