const jwt = require('jsonwebtoken');

const assignToken = (id) => {
  const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  return token;
};

module.exports = { assignToken };
