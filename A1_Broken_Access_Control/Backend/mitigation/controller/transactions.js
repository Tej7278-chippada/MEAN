const model = require('../models/schema');

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
        });
      if (data) {
        res.send(data);
      }
      else {
        throw new Error('Transaction Unsuccessful');
      }
    }
    catch (err) {
      next(err);
    }
  }
  
  
  
  exports.getReport = async (senderCity, receiverCity, req, res, next) => {
    try {
      const base64Credentials = req.headers.authorization.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');
      const userDetails = await model.userModel.find({ userId:username, password:password });
      if (userDetails[0].role === 'admin') {
        const transactions = await model.transactionsModel.find({ senderCity, receiverCity });
        if (transactions.length === 0) {
          throw new Error('No records found');
        } else {
          res.json(transactions);
        }
      }
      else {
        throw new Error('Forbidden Error');
      }
    }
    catch (err) {
      next(err);
    }
  }
  
  