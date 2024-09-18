const logger = (err, req, res, next) => {
  if (err) {
    res.status(500);
    res.json({ message: err.message });
  }
  next();
};

module.exports = logger;
