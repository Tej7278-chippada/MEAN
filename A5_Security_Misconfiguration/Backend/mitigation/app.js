const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/ErrorLogger');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  if (req.path.match(/.json/) || req.path.match(/.txt/) || req.path.match(/.js/)) {
    res.redirect('invalid');
  } else {
    next();
  }
});

app.use(express.static('public'));


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
