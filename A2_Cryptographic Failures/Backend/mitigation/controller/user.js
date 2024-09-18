const model = require('../models/schema')
const bcrypt = require('bcryptjs')
exports.registerUser = async (newUser, res, next) => {
  try {
    let userDetails = await model.userModel.find({ userId: newUser.userId, phone: newUser.phone })
    if (userDetails.length === 0) {
      let hash = await bcrypt.hash(newUser.password, 10)
      let data = await model.userModel.create(
        {
          userId: newUser.userId,
          password: hash,
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
    const userDetails = await model.userModel.find({ userId: userId })
    if (userDetails.length === 0) {
      throw new Error('Invalid  Credentials');
    } else {
      const result = await bcrypt.compare(password, userDetails[0].password)
      if (result) {
        res.send(true)
      }
      else {
        throw new Error('Invalid  Credentials');
      }
    }
  }
  catch (err) {
    next(err)
  }

}
