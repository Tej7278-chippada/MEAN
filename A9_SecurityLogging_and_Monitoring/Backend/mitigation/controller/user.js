const model = require('../models/schema')
const winston = require('winston');


exports.loginUser = async (userId, password, res, next) => {
  try {
    const userDetails = await model.userModel.find({ userId: userId, password: password })
    if (userDetails.length === 0) {
      const user = await model.userModel.updateOne({ userId }, { $inc: { failedlogin: 1 } })
      if (user.nModified === 0) {
        winston.log({ level: 'info', message: `No user with userId '${userId}'`, timestamp: new Date().toLocaleString() });
        throw new Error('Invalid  Credential')
      } if (user.nModified !== 0) {
        winston.log({ level: 'warn', message: `Wrong password entered by userId ${userId}`, timestamp: new Date().toLocaleString() });
        throw new Error('Invalid  Credential')
      }
    }
    else if (userDetails[0].failedlogin <= 2) {
      await model.userModel.updateOne({ userId }, { $set: { failedlogin: 0 } })
      res.send(true);
    }
    else {
     
      await model.userModel.updateOne({ userId }, { $set: { locked: true } });
      winston.log({ level: 'warn', message: `Account Locked for userId '${userId}'`, timestamp: new Date().toLocaleString() });
      throw new Error('Account Locked ! Contact Admin !');
    }
  }
  catch (err) {
    winston.log({ level: 'error', message: 'Error while login user', timestamp: new Date().toLocaleString() });
    next(err)
  }
}

exports.registerUser = async (newUser, res, next) => {
  try {
    let userDetails = await model.userModel.find({ userId: newUser.userId, phone: newUser.phone })
    if (userDetails.length === 0) {
      let data = await model.userModel.create(
        {
          userId: newUser.userId,
          password: newUser.password,
          name: newUser.name,
          city: newUser.city,
          email: newUser.email,
          phone: newUser.phone,
          role: 'user',
          failedlogin: 0,
          locked: false,
        })
      if (data) {
        res.send(true)
      }
      else {
        winston.log({ level: 'error', message: 'Registration Unsuccessful', timestamp: new Date().toLocaleString() });
        throw new Error('Registration Unsuccessful')
      }
    }
    else {
      winston.log({ level: 'info', message: 'User already registered', timestamp: new Date().toLocaleString() });
      throw new Error('User already registered')
    }
  }
  catch (err) {
    winston.log({ level: 'error', message: 'Error while login user', timestamp: new Date().toLocaleString() });
    next(err)
  }
}