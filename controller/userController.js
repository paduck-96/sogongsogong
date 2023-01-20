const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken")

exports.getRegister = (req, res, next)=>{
    return res.status(200).json({result:"Success", data:"회원가입 페이지 출력"})
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * 이메일로 중복 회원가입 여부를 확인하고
 * 닉네임은 고유성을 유지해야하고
 * 비밀번호는 2중으로 확인
 */
exports.postRegister = async (req, res, next) => {
    const {
        email,
        nickname,
        password,
        confirmPassword,
        } = req.body;
        try {
            if(password !== confirmPassword){
                //return res.redirect("/register?registerError=비밀번호를 잘못 입력하셨습니다");
                return res.status(400).json({result:"비밀번호 잘못 입력"})
            }
            const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if( !reg.test(password) ) {
                return res.status(400).json({result:"비밀번호 정규식 오류"})
            }
            const user = await User.findOne({
                where:{
                    email
                }
            })
            if (user) {
                    //return res.redirect('/register?registerError=이미 가입된 이메일입니다');
                    return res.status(409).json({result:"이미 가입된 회원"})
                }
            const existNickname = await User.findOne({
                where:{
                    nickname
                }
            });
            if(existNickname){
                return res.status(409).json({result:"이미 사용 중인 닉네임"})
            }
            const saltRounds = await bcrypt.genSalt(5);
            const hashPassword = await bcrypt.hash(password, saltRounds);
            await User.create({
                    email,
                    nickname,
                    password: hashPassword,
                })
                return res.status(201).redirect('/');
            } catch (error) {
                console.error(error);
                return next(error);
            }
};

exports.getLogin =  (req, res, next) => {
    return res.status(200).json({result:"Success", data:"로그인 페이지 출력"})
}; 
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * 이메일과 비밀번호로 사용자 로그인 처리 
 */
exports.postLogin = (req, res, next) => {
    passport.authenticate('local',(authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            //return res.redirect(`/?loginError=${info.message}`);
            return res.status(404).json({result:info.message})
        }
            return req.login(user, {session:false}, (loginError) => {
        if (loginError) {
            console.error(loginError);
            return next(loginError);
        }
        // 클라이언트에게 JWT생성
		const token = jwt.sign(
			{ id: user.userId, email: user.email, auth: user.auth },
			process.env.JWT_SECRET
		);
        res.locals.user = token;
        return res.status(200).json({result:"success", data:token})
        });
    })(req, res, next);
};

exports.getAuth = (req, res, next) => {
    try {
	    res.status(200).json({ result:"success" });
	  } catch (error) {
	    console.error(error);
	    next(error);
	  }
}

exports.postLogout = (req, res) => {
    req.logout(err=>{
        if (err) { return next(err); }
        req.session.destroy();
        res.locals.user = null;
        res.status(200).redirect("/");
        });
}