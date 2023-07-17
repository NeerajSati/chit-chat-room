const jwt = require("jsonwebtoken")
const generateToken = (data) => {
    const token = jwt.sign(data.toJSON(), process.env.JWT_VERIFY);
    return token;
};

const jwtAuthenticationMiddleware = (req,res,next) => {
  try {
    let token = req.headers.authorization;
    token = token.split("Bearer ")[1]
    const decoded = jwt.verify(token, process.env.JWT_VERIFY);
    req.userId = decoded._id;
    req.userName = decoded.username;
    next()
  } catch(err) {
    return res.status(401).json({success: false, msg: "Invalid authorization token!"})
  }
};

module.exports = {generateToken, jwtAuthenticationMiddleware}