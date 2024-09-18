const express = require('express');
const user = require('../controller/user');
const transactions = require('../controller/transactions');
const NewUser = require('../utilities/helpers/user');
const NewTransaction = require('../utilities/helpers/transaction');
const validator = require('../utilities/Validator');

const routing = express.Router();

routing.get('/', (req, res) => {
  res.json({ message: 'Welcome to SwiftCourier' });
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

routing.post('/transactions', (req, res, next) => {
  const {
    sender, receiver, senderCity, receiverCity, senderAddress, receiverAddress,hash
  } = req.body;
  if (validator.validSenderName(sender, next) && validator.validReceiverName(receiver, next)
    && validator.validSenderAddress(senderAddress, next) && validator.validReceiverAddress(receiverAddress, next)
    && validator.validSenderCity(senderCity, next) && validator.validReceiverCity(receiverCity, next)&& validator.validateHash(hash, sender + receiver + senderCity + receiverCity + senderAddress + receiverAddress, next)) {
    const newTransaction = new NewTransaction(sender, receiver, senderAddress, receiverAddress, senderCity, receiverCity);
    transactions.sendCourier(newTransaction, res, next);
  }
});

routing.get('/transactions/:senderCity/:receiverCity', (req, res, next) => {
  const { senderCity, receiverCity } = req.params;
  if (validator.validSenderCity(senderCity, next)
    && validator.validReceiverCity(receiverCity, next)) {
      transactions.getReport(senderCity, receiverCity, req, res, next);
  }
});

module.exports = routing;
