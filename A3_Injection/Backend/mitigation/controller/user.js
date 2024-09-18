const mongoSanitize = require('mongo-sanitize');
const model = require('../models/schema')

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
    const sanitizeUserId = mongoSanitize(userId);
    const sanitizedPassword = mongoSanitize(password);
    const userDetails = await model.userModel.find({ userId: sanitizeUserId, password: sanitizedPassword.toString() })
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
