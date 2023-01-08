
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        //res.redirect('/?loginError=로그인이 필요합니다.');
        res.status(403).json({result:"Fail", message:"로그인 필요"});
    }
    };

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent("로그인 상태입니다")
        res.redirect(`/?error=${message}`);
    }
};