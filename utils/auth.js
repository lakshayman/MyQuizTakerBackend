const jwt = require("jsonwebtoken");
exports.createJWT = (emailid, name, userId, duration) => {
   const payload = {
      emailid,
      name,
      userId,
      duration,
      currentElements: [],
      currentQuizTitle: 'Title'
   };
   return jwt.sign(payload, "process.env.TOKEN_SECRET", {
     expiresIn: duration,
   });
};