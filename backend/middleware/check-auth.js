const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.user = {
      email: decodedToken.email,
      userId: decodedToken.userId
    }
    next();
  } catch (error) {
    console.log("Token not found");
    res.status(401).json({
      message: "Auth failed!"
    });
  }
};
