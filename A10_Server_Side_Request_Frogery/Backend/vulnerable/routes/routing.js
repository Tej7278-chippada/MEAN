const express = require('express');
const axios = require('axios')
const user = require('../controller/user');
const transactions = require('../controller/transactions');
const NewUser = require('../utilities/helpers/user');
const NewTransaction = require('../utilities/helpers/transaction');
const validator = require('../utilities/Validator');

const routing = express.Router();

routing.get('/', async (req, res) => {
  const res1 = await axios.get('http://localhost:8080/')
  res.send(res1.data);
});

routing.post('/register', async (req, res, next) => {
  const res1 = await axios.post('http://localhost:8080/register', req.body)
  res.send(res1.data);
});

routing.post('/login', async (req, res, next) => {
  const res1 = await axios.post('http://localhost:8080/login', req.body)
  res.send(res1.data);
});

routing.post('/transactions', async (req, res, next) => {
  const {
    sender, receiver, senderCity, receiverCity, senderAddress, receiverAddress,
  } = req.body;
  if (validator.validSenderName(sender, next) && validator.validReceiverName(receiver, next)
    && validator.validSenderAddress(senderAddress, next) && validator.validReceiverAddress(receiverAddress, next)
    && validator.validSenderCity(senderCity, next) && validator.validReceiverCity(receiverCity, next)) {
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
