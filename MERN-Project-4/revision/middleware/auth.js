let auth = (req, res, next) => {
  req.headers.token === "12345"
    ? next()
    : res.status(400).send(`your are not authentacted a token`);
};
module.exports = auth;
