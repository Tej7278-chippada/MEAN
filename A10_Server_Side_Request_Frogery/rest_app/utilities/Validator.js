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
