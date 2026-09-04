const jwt = require("jsonwebtoken");
exports.authenticate = (req,res,next)=>{const h=req.headers.authorization;if(!h||!h.startsWith("Bearer "))return res.status(401).json({error:"No token"});try{const p=jwt.verify(h.split(" ")[1],process.env.JWT_SECRET);req.userId=p.id;req.userRole=p.role||null;next()}catch(err){res.status(401).json({error:"Invalid token"})}};
exports.adminOnly = (req,res,next)=>{if(req.userRole==="admin"||req.userId===1)return next();res.status(403).json({error:"Admin only"})};
