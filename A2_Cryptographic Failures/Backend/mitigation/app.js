const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs')
const https = require('https')
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/ErrorLogger');

const app = express();

const httpsOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
  passphrase: 'swift',
  rejectUnauthorized: true
};

app.use(cors());
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

https.createServer(httpsOptions, app).listen(3000, function () {
  console.log('Server listening in port 3000');
});

