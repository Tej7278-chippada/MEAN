const errorObject = new Error();
const winston = require('winston');
exports.validUserId = (userId, next) => {
  if (userId.length === 0) {
    winston.log({ level: 'info', message: 'UserId is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'UserId is mandatory';
    next(errorObject);
  } else if (userId.length < 4 || userId.length > 15) {
    winston.log({ level: 'info', message: 'UserId must be between 4 to 15 characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'UserId must be between 4 to 15 characters';
    next(errorObject);
  } else if (!userId.match(/^[a-zA-Z0-9_]*$/)) {
    winston.log({ level: 'info', message: 'UserId has invalid characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'UserId has invalid characters';
    next(errorObject);
  } else if (userId.length >= 4 && userId.length <= 15 && userId.match(/^[a-zA-Z0-9_]*$/)) {
    return true;
  }
};

exports.validPassword = (password, next) => {
  if (password.length === 0) {
    winston.log({ level: 'info', message: 'Password is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Password is mandatory';
    next(errorObject);
  } else if (!password.match(/^(?=.{8,15}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)) {
    winston.log({ level: 'info', message: 'Password must have atleast 8 characters; 1 special character, 1 number, 1 uppercase and 1 lowercase', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Password must have atleast 8 characters; 1 special character, 1 number, 1 uppercase and 1 lowercase';
    next(errorObject);
  } else if (password.match(/^(?=.{8,15}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)) {
    return true;
  }
};

exports.validName = (name, next) => {
  if (name.length === 0) {
    winston.log({ level: 'info', message: 'Name is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Name is mandatory';
    next(errorObject);
  } else if (name.length < 3 || name.length > 15) {
    winston.log({ level: 'info', message: 'Name must be between 3 to 15 characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Name must be between 3 to 15 characters';
    next(errorObject);
  } else if (!name.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    winston.log({ level: 'info', message: 'Name has invalid characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Name has invalid characters';
    next(errorObject);
  } else if (name.length >= 3 && name.length <= 15 && name.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    return true;
  }
};

exports.validCity = (city, next) => {
  if (city.length === 0) {
    winston.log({ level: 'info', message: 'City is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'City is mandatory';
    next(errorObject);
  } else if (city.length < 3 || city.length > 15) {
    winston.log({ level: 'info', message: 'City must be between 3 to 15 characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'City must be between 3 to 15 characters';
    next(errorObject);
  } else if (!city.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    winston.log({ level: 'info', message: 'City has invalid characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'City has invalid characters';
    next(errorObject);
  } else if (city.length >= 3 && city.length <= 15 && city.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    return true;
  }
};

exports.validEmail = (email, next) => {
  if (email.length === 0) {

    winston.log({ level: 'info', message: 'Email is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Email is mandatory';
    next(errorObject);
  } else if (!email.match(/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/)) {
    
    winston.log({ level: 'info', message: 'Email is not in valid format', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Email is not in valid format';
    next(errorObject);
  } else if (email.match(/^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/)) {
    return true;
  }
};

exports.validPhoneNo = (phoneNo, next) => {
  if (phoneNo === 0) {
    winston.log({ level: 'info', message: 'Phone Number is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Phone Number is mandatory';
    next(errorObject);
  } else if (phoneNo < 1000000000 || phoneNo > 9999999999) {
    winston.log({ level: 'info', message: 'Phone Number must be 10 digits', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Phone Number must be 10 digits';
    next(errorObject);
  }
  if (phoneNo >= 1000000000 && phoneNo <= 9999999999) {
    return true;
  }
};

exports.validSenderName = (senderName, next) => {
  if (senderName.length === 0) {
    winston.log({ level: 'info', message: 'Sender Name is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Sender Name is mandatory';
    next(errorObject);
  } else if (senderName.length < 3 || senderName.length > 15) {
    winston.log({ level: 'info', message: 'Sender Name must be between 3 to 15 characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Sender Name must be between 3 to 15 characters';
    next(errorObject);
  } else if (!senderName.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    winston.log({ level: 'info', message: 'Sender Name has invalid characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Sender Name has invalid characters';
    next(errorObject);
  } else if (senderName.length >= 3 && senderName.length <= 15 && senderName.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    return true;
  }
};


exports.validReceiverName = (receiverName, next) => {
  if (receiverName.length === 0) {
    winston.log({ level: 'info', message: 'Receiver Name is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Receiver Name is mandatory';
    next(errorObject);
  } else if (receiverName.length < 3 || receiverName.length > 15) {
    winston.log({ level: 'info', message: 'Receiver Name must be between 3 to 15 characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Receiver Name must be between 3 to 15 characters';
    next(errorObject);
  } else if (!receiverName.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    winston.log({ level: 'info', message: 'Receiver Name has invalid characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Receiver Name has invalid characters';
    next(errorObject);
  } else if (receiverName.length >= 3 && receiverName.length <= 15 && receiverName.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
    return true;
  }
};

exports.validSenderAddress = (senderAddress, next) => {
  if (senderAddress.length === 0) {
    winston.log({ level: 'info', message: 'Sender Address is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Sender Address is mandatory';
    next(errorObject);
  } else if (senderAddress.length < 5 || senderAddress.length > 50) {
    winston.log({ level: 'info', message: 'Sender Address must be between 5 to 50 characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Sender Address must be between 5 to 50 characters';
    next(errorObject);
  } else if (senderAddress.length >= 5 && senderAddress.length <= 50) {
    return true;
  }
};


exports.validReceiverAddress = (receiverAddress, next) => {
  if (receiverAddress.length === 0) {
    winston.log({ level: 'info', message: 'Receiver Address is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Receiver Address is mandatory';
    next(errorObject);
  } else if (receiverAddress.length < 5 || receiverAddress.length > 50) {
    winston.log({ level: 'info', message: 'Receiver Address must be between 5 to 50 characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Receiver Address must be between 5 to 50 characters';
    next(errorObject);
  } else if (receiverAddress.length >= 5 && receiverAddress.length <= 50) {
    return true;
  }
};

exports.validSenderCity = (senderCity, next) => {
  if (senderCity.length === 0) {
    winston.log({ level: 'info', message: 'Sender City is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Sender City is mandatory';
    next(errorObject);
  } else if (!senderCity.match(/^[A-Za-z]*$/)) {
    winston.log({ level: 'info', message: 'Sender City has invalid characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Sender City has invalid characters';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validReceiverCity = (receiverCity, next) => {
  if (receiverCity.length === 0) {
    winston.log({ level: 'info', message: 'Receiver City is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Receiver City is mandatory';
    next(errorObject);
  } else if (!receiverCity.match(/^[A-Za-z]*$/)) {
    winston.log({ level: 'info', message: 'Receiver City has invalid characters', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Receiver City has invalid characters';
    next(errorObject);
  } else {
    return true;
  }
};


exports.validateUserId = (userId, next) => {
  userId.replace(/ /g, '');
  if (userId.length === 0) {
    winston.log({ level: 'info', message: 'UserId is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'UserId is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validatePassword = (password, next) => {
  if (password.length === 0) {
    winston.log({ level: 'info', message: 'Password is mandatory', timestamp: new Date().toLocaleString() });
    errorObject.message = 'Password is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};
