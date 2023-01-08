const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getLogin =  (req, res, next) => {
    return res.json({result:"Success", data:"로그인 페이지 출력"})
}; 
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * 이메일과 비밀번호로 사용자 로그인 처리 
 */
exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            //return res.redirect(`/?loginError=${info.message}`);
            return res.json({result:info.message})
        }
            return req.login(user, (loginError) => {
        if (loginError) {
            console.error(loginError);
            return next(loginError);
        }
        //return res.redirect('/');
        return res.json({result:"로그인 성공"})
        });
    })(req, res, next);
};

exports.getRegister = (req, res, next)=>{
    return res.json({result:"Success", data:"회원가입 페이지 출력"})
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
                return res.json({result:"비밀번호 잘못 입력"})
            }
            const user = await User.findOne({
                where: {
                    email
                }
            });
            if (user) {
                    //return res.redirect('/register?registerError=이미 가입된 이메일입니다');
                    return res.json({result:"이미 가입된 회원"})
                }
            const saltRounds = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, saltRounds);
                await User.create({
                    email,
                    nickname,
                    password: hashPassword,
                });
                //return res.redirect('/');
                return res.json({result:"회원가입 성공"})
            } catch (error) {
                console.error(error);
                return next(error);
            }
};

exports.getLogout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        //res.redirect('/');
        res.json({result:"Success", data:"로그아웃"})
        });
}