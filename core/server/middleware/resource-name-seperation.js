module.exports = function (req, res, next) {
  req.resource = req.path.split('/')[1];
  next();
};
