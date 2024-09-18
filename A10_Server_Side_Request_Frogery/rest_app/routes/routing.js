const express = require('express');
const user = require('../controller/user');

const NewUser = require('../utilities/helpers/user');

const validator = require('../utilities/Validator');

const routing = express.Router();

routing.get('/', (req, res) => {
  res.json({ message: 'Welcome to app' });
});

routing.post('/register', (req, res, next) => {
  const {
    userId, password, name, city, email, phone,
  } = req.body;
  if (validator.validUserId(userId, next) && validator.validPassword(password, next)
    && validator.validName(name, next) && validator.validCity(city, next)
    && validator.validEmail(email, next) && validator.validPhoneNo(phone, next)) {
    const newUser = new NewUser(userId, password, name, city, email, phone);
    user.registerUser(newUser, res, next);
  }
});

routing.post('/login', (req, res, next) => {
  const { userId, password } = req.body;
  if (validator.validateUserId(userId, next) && validator.validatePassword(password, next)) {
    user.loginUser(userId, password, res, next);
  }
});

module.exports = routing;
