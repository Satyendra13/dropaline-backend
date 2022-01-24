const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "deveoped by satyendra");
    if(vertify == "admin"){
        next();
    }
    else{
        return res.status(401).json({
            error:"not admin"
        })    
    }
  } catch (err) {
    return res.status(401).json({
      error: "invaid token",
    });
  }
};
