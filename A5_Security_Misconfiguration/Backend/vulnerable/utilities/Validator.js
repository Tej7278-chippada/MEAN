const errorObject = new Error();

exports.validUserId = (userId, next) => {
  if (userId.length === 0) {
    errorObject.message = 'UserId is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validPassword = (password, next) => {
  if (password.length === 0) {
    errorObject.message = 'Password is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validName = (name, next) => {
  if (name.length === 0) {
    errorObject.message = 'Name is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validCity = (city, next) => {
  if (city.length === 0) {
    errorObject.message = 'City is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validEmail = (email, next) => {
  if (email.length === 0) {
    errorObject.message = 'Email is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validPhoneNo = (phoneNo, next) => {
  if (phoneNo === 0) {
    errorObject.message = 'Phone Number is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validSenderName = (senderName, next) => {
  if (senderName.length === 0) {
    errorObject.message = 'Sender Name is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};


exports.validReceiverName = (receiverName, next) => {
  if (receiverName.length === 0) {
    errorObject.message = 'Receiver Name is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validSenderAddress = (senderAddress, next) => {
  if (senderAddress.length === 0) {
    errorObject.message = 'Sender Address is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};


exports.validReceiverAddress = (receiverAddress, next) => {
  if (receiverAddress.length === 0) {
    errorObject.message = 'Receiver Address is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validSenderCity = (senderCity, next) => {
  if (senderCity.length === 0) {
    errorObject.message = 'Sender City is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validReceiverCity = (receiverCity, next) => {
  if (receiverCity.length === 0) {
    errorObject.message = 'Receiver City is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};


exports.validateUserId = (userId, next) => {
  if (userId.length === 0) {
    errorObject.message = 'UserId is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};

exports.validatePassword = (password, next) => {
  if (password.length === 0) {
    errorObject.message = 'Password is mandatory';
    next(errorObject);
  } else {
    return true;
  }
};
