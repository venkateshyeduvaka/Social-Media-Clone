const jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token)
      if (token) {
        const decoded = jwt.verify(token, "MERN");
        console.log(decoded)
        req.body._id = decoded?.id;
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };

  module.exports=authMiddleWare