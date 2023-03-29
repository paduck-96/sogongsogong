const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    console.log(authHeader);
    if(!authHeader){
        const err = new Error("인증이 필요합니다");
        err.statusCode = 401;
        throw err;
    }
    const token = req.get("Authorization").split(" ")[1];
    try{
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const err = new Error("인증 실패");
        err.statusCode = 401;
        throw err;
    }
    req.userId = decodedToken.userId;
    next();
}