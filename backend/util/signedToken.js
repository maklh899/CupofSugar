const jwt = require('jsonwebtoken');

const key = require('../keys');

const getSignedToken = function SignedToken(id) {
  return jwt.sign({ _id: id }, key.JWT_SECRET);
};
// return jwt.sign({ _id: id }, key.JWT_SECRET, { expiresIn: '1hr' });
module.exports = getSignedToken;
