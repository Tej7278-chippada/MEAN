const model = require('../models/schema')
const winston = require('winston');

exports.sendCourier = async (newTransaction, res, next) => {
  try {
    const transactions = await model.transactionsModel.find();
    const transactionsLength = transactions.length;
    const data = await model.transactionsModel.create(
      {
        id: transactionsLength + 1,
        sender: newTransaction.sender,
        receiver: newTransaction.receiver,
        senderAddress: newTransaction.senderAddress,
        receiverAddress: newTransaction.receiverAddress,
        senderCity: newTransaction.senderCity,
        receiverCity: newTransaction.receiverCity,
        status: 'pending',
        date: new Date().toLocaleDateString(),
      })
    if (data) {
      res.send(data)
    }
    else {
      winston.log({ level: 'error', message: 'Transaction Unsuccessful', timestamp: new Date().toLocaleString() });
      throw new Error('Transaction Unsuccessful')
    }
  }
  catch (err) {
    winston.log({ level: 'error', message: 'Error Occured', timestamp: new Date().toLocaleString() });
    next(err)
  }
}

exports.getReport = async (senderCity, receiverCity, res, next) => {
  try {
    const transactions = await model.transactionsModel.find({ senderCity: senderCity, receiverCity: receiverCity }, { _id: 0 })
    if (transactions.length === 0) {
      winston.log({ level: 'error', message: 'No records found', timestamp: new Date().toLocaleString() });
      throw new Error('No records found');
    } else {
      res.send(transactions)
    }
  }
  catch (err) {
    winston.log({ level: 'error', message: 'Error while getting Report', timestamp: new Date().toLocaleString() });
    next(err)
  }
};

