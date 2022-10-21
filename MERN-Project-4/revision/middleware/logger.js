let logger = (req, res, next) => {
  req.url === "/attack"
    ? res.send("Your are under cyber attack or bacha attack")
    : next();
};
module.exports = logger;
