const errorHandler = (err, req, res, next) => {
  console.log(err);
  //Bad Request
  if (err.status === 400) {
    res.status(400).json(err.inner.message);
  }
  //Unauthorized
  if (err.status === 401) {
    res.status(401).json(err.inner.message);
  }
  //Forbidden
  if (err.status === 403) {
    res.status(403).json(err.inner.message);
  }
  //Not Found
  if (err.status === 404) {
    res.status(404).json(err.inner.message);
  }
  //Internal Server Error
  if (err.status === 500) {
    res.status(500).json(err.inner.message);
  }
  //Service Unavailable
  if (err.status === 503) {
    res.status(503).json(err.inner.message);
  }
};

module.exports = errorHandler;
