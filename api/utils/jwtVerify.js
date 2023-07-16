const jwt = require("jsonwebtoken")
const generateToken = (data) => {
    const token = jwt.sign(data.toJSON(), process.env.JWT_VERIFY);
    return token;
  };
module.exports = {generateToken}