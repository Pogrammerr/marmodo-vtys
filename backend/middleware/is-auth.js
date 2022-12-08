const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1]; // Bearer ey17hsd71bxhj
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    e.statusCode = 500;
    throw e;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
