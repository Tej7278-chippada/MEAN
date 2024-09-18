const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/swiftcourierDb',{useNewUrlParser:true,useUnifiedTopology: true  })

let userSchema = new mongoose.Schema({
    "userId": String,
    "password": String,
    "name": String,
    "city": String,
    "email": String,
    "phone": Number,
    "role": String,
    "mname":String
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

let transactionsSchema = new mongoose.Schema({
    "id": Number,
    "sender": String,
    "receiver": String,
    "senderAddress": String,
    "receiverAddress": String,
    "senderCity": String,
    "receiverCity": String,
    "status": String,
    "date": Date,
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})


exports.userModel = mongoose.model('userdetails', userSchema)

exports.transactionsModel = mongoose.model('transactions', transactionsSchema)