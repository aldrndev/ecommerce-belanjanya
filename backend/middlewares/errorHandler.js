const errorHandler = (error, req, res, next) => {
  let message = "Internal Server Error";
  let statusCode = 500;

  if (
    error.message ||
    error.name ||
    error.statusCode ||
    error.status ||
    error.errors ||
    error.error
  ) {
    message = error.message;
    statusCode = error.statusCode || error.status || 500;
  }

  // if (error.name === "JsonWebTokenError" || error.message === "unathorized") {
  //   message = "Please login first to your account for booking room";
  //   statusCode = 401;
  // }

  // if (
  //   error.name === "SequelizeValidationError" ||
  //   error.name === "SequelizeUniqueConstraintError" ||
  //   error.name === "SequelizeDatabaseError"
  // ) {
  //   message = error.errors.map((error) => error.message).join(",");
  //   statusCode = 400;
  // }

  // if (error.name === "TokenExpiredError") {
  //   statusCode = 401;
  //   message = "Token Expired";
  // }

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
