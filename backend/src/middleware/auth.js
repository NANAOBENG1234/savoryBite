const jwt = require("jsonwebtoken");
exports.authenticate = (req,res,next)=>{const h=req.headers.authorization;if(!h||!h.startsWith("Bearer "))return res.status(401).json({error:"No token"});try{req.userId=jwt.verify(h.split(" ")[1],process.env.JWT_SECRET).id;next()}catch(err){res.status(401).json({error:"Invalid token"})}};
exports.adminOnly = (req,res,next)=>{if(req.userId!==1)return res.status(403).json({error:"Admin only"});next()};
