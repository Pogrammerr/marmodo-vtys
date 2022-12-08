exports.handleError = (err, next) => {
  if (err.statusCode != 500) {
    err.statusCode = 500;
  }
  console.log("An error occured!", err);
  next(err);
};
