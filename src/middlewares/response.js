module.exports = (req, res, next) => {
  res.ok = (content) => {
    res.status(200).send(content);
    next();
  };

  res.badRequest = (message) => {
    res.status(400).send(message);
    next();
  };

  res.error = (code = 500, message) => {
    res.status(code).send({ error: message });
    next();
  };

  next();
};
