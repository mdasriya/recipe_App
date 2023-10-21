const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
const token = req.headers.authorization?.split(" ")[1]

 if(token){
try {
  const decoded = jwt.verify(token, "masai")
  if(decoded){
  
   req.body.UserId = decoded.UserId
   req.body.user = decoded.user
   next()
  }else{
    res.json({msg:"Not authorized"})
  }
} catch (error) {
  console.log(error);  
}
 }else{
    res.json({msg:"please login first"})
 }



}

module.exports = {
    auth
}