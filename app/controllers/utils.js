module.exports.handleErrorResponse = (res, statusCode, err) => {
  res.status(statusCode).json(err);
};