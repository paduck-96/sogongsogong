const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    
    if(!authHeader){
        const err = new Error("인증이 필요합니다");
        err.statusCode = 401;
        return next(err);
    }
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        err.statusCode = 500;
        return next(err);
    }
    if(!decodedToken){
        const err = new Error("인증 실패");
        err.statusCode = 401;
        return next(err);
    }
    req.userId = decodedToken.userId;
    next();
}