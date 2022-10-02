const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const app = express();
const СustomError = require('./utils/customError');
const { catchErrors } = require('./controllers/errors');
const { ERROR_404_TEXT, ERROR_404 } = require('./utils/constants');

const allowedCors = [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
  ];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

require('dotenv').config(); //Файл .env 

const { auth } = require('./middlewares/auth');

app.use(requestLogger); // DDOS shield
app.use(helmet()); // eader correction

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose.connect("mongodb://localhost:27017/bitfilmsdb");
mongoose.connect(process.env.DB_CONN);

app.use(
  cors({
    origin: allowedCors,
    credentials: true,
  })
);

app.use(limiter);

app.use('/signup', require('./routers/logup'));
app.use('/signin', require('./routers/login'));

app.use(auth);

app.use('/users', require('./routers/users'));
app.use('/movies', require('./routers/movies'));

app.use('*', (_req, res, next) => {
  next(new СustomError(ERROR_404_TEXT, ERROR_404));
});

app.use(errorLogger);
app.use(errors());
app.use(catchErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
