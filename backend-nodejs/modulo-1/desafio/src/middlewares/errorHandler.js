const handleError = (err, _req, res, _next) => {
  const { status, message } = err;
  return res.status(status || 500).json({ message });
};

const asyncHandleError = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  handleError,
  asyncHandleError,
};
