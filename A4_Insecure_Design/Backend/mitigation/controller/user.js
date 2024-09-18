const model = require('../models/schema')
const otpGenerator = require('otp-generator')
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
        })
      if (data) {
        res.send(true)
      }
      else {
        throw new Error('Registration Unsuccessful')
      }
    }
    else {
      throw new Error('User already registered')
    }
  }
  catch (err) {
    next(err)
  }
}

exports.loginUser = async (userId, password, res, next) => {
  try {
    const userDetails = await model.userModel.find({ userId: userId, password: password })
    if (userDetails.length === 0) {
      throw new Error('Invalid  Credentials');
    } else {
      res.send(true)
    }
  }
  catch (err) {
    next(err)
  }

}


exports.getOTP = async (userId, res, next) => {
  try {
    const userDetails = await model.userModel.find({ userId: userId });
    if (userDetails.length === 0) {
      throw new Error('Invalid  User');
    } else {
      let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
      await model.logModel.updateOne({ userId: userId }, { "$set": { "otp": otp } }, { upsert: true });
      res.send(true);
    }
  }
  catch (err) {
    next(err);
  }

}


exports.verifyOTP = async (userId,otp, res, next) => {
  try {
    const userDetails = await model.logModel.find({ userId: userId })
    if (userDetails.length > 0 && userDetails[0].otp == otp) {
      res.send(true)
    } else {

      throw new Error('Invalid  otp');
    }
  }
  catch (err) {
    next(err)
  }

}