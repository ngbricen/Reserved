const jwt = require('jsonwebtoken');
const models = require('../models/index');
const { keys } = require('../config/config.json');

module.exports = function (req, res, next) {
  //Get Token From Header
  const token = req.header('x-auth-token');
  const secret = keys.jwtToken;

  console.log('Entering middleware');
  const decoded = jwt.verify(token, secret);

  //Check If no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization failed' });
  }

  req.user = decoded.user;
  console.log(decoded);
  if (req.params.id && req.user.id.toString() !== req.params.id) {
    return res.status(401).json({ msg: 'token for incorrect user' });
  }

  next();

};
