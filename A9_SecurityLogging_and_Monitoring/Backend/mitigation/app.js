const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const winston = require('winston');
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/ErrorLogger');

const app = express();

app.use(cors());
const logStream = fs.createWriteStream('req.log', { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));


winston.configure({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logger.log' }),
  ],
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'itisasecret',
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());
app.use('/', router);
app.use(myErrorLogger);

app.listen(3000);
console.log('Server listening in port 3000');
