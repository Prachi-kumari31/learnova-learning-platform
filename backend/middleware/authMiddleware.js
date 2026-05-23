import jwt from "jsonwebtoken";

export default function(req,res,next){

try{

const token = req.headers.authorization?.split(" ")[1];

if(!token){
return res.status(401).json({
message:"Unauthorized"
});
}

const decoded = jwt.verify(token,"secretkey");

req.user = decoded;

next();

}catch(err){

return res.status(401).json({
message:"Invalid Token"
});

}

}