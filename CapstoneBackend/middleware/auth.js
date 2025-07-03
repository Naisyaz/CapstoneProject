const jwt = require("jsonwebtoken");
  
  function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
  // [changed the secret]
    jwt.verify(token, "i6SqmayC6RnbvfNdcrDvmuzVznyHYi5wMyum3Ku21W4eGdjsdZaFqBcDvXltgHZGiUc01fEKzW0POgPEqRXlXg==", (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = decoded;
      next();
    });
  }
  
  module.exports = verifyToken;