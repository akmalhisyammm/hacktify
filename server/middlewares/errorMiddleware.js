module.exports = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal server error';

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    err.status = 400;
    err.message = err.errors.map((error) => error.message).join(', ');
  }

  if (err.name === 'JsonWebTokenError') {
    err.status = 401;
    err.message = 'Invalid token';
  }

  res.status(err.status).json({ message: err.message });
};
