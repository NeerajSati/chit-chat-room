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

const authenticateSocketConnection = (socket, next) =>{
  try {
    const bearerToken = socket.handshake.query?.token;
    const token = bearerToken.split("Bearer ")[1]
    const decoded = jwt.verify(token, process.env.JWT_VERIFY);
    socket.user = decoded;
  } catch (err) {
    return next(new Error("NOT AUTHORIZED"));
  }
  next();
}

const authenticateSocketMessage = (socket, token) =>{
  try {
    const decoded = jwt.verify(token, process.env.JWT_VERIFY);
    socket.user = decoded;
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {generateToken, jwtAuthenticationMiddleware, authenticateSocketConnection, authenticateSocketMessage}