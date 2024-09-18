const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/ErrorLogger');
// const mongoSanitize = require('express-mongo-sanitize');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(mongoSanitize());
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
