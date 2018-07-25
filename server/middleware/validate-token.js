require('dotenv').config({ path: './.env' });
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  if (req.body.token) {
    const { token } = req.body;
    return jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      next();
    });
  }
  res.status(404).json({ message: "Token is not available! User must login!" });
};

module.exports = validateToken;

