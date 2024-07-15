const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

exports.matchToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(400).send("Token not provided");
    jwt.verify(token.replace("Bearer ", ""), JWT_SECRET, (error, decoded) => {
      if (error) return res.status(401).send("Invalid Token");
      req.user = decoded;
      console.log(decoded);
      next();
    });
  };


  
  