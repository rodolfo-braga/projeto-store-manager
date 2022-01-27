module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    const status = err.details[0].message.includes('required') ? 400 : 422; 
    return res.status(status)
      .json({ message: err.details[0].message });
  }

  const statusByErrorCode = {
    notFound: 404,
    conflict: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};
