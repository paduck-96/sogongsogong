const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken")

exports.getRegister = (req, res, next)=>{
    return res.status(200).json({result:"success", data:"회원가입 페이지 출력"})
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
            if(nickname.trim()==="" || email.trim()===""
        ||password.trim()===""||confirmPassword.trim()===""){
            return res.status(400).json({result:"fail", message:"모든 내용을 작성해야 합니다"})
        }
            if(password !== confirmPassword){
                //return res.redirect("/register?registerError=비밀번호를 잘못 입력하셨습니다");
                return res.status(400).json({result:"비밀번호를 재확인 해주세요"})
            }
            const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if( !reg.test(password) ) {
                return res.status(400).json({result:"비밀번호는 영어 소문자, 대문자와 특수기호를 하나씩 포함한 8글자 이상으로 설정해주세요"})
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
            const saltRounds = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const data = await User.create({
                    email,
                    nickname,
                    password: hashPassword,
                })
                return res.status(201).json({result:"success", data})
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
    const {email, password} = req.body;
    let exUser;
    User.findOne({
        where:{
            email
        }
    })
    .then(user => {
        if(!user){
            const err = new Error("존재하지 않는 이메일입니다");
            err.statusCode = 401;
            throw err;
        }
        exUser = user;
        return bcrypt.compare(password, exUser.password)
    })
    .then(isEqual => {
        if(!isEqual){
            const err = new Error("비밀번호를 잘못 입력하셨습니다");
            err.statusCode = 401;
            throw err;
        }
        const token = jwt.sign({
            id:exUser.id,
            email:exUser.email
        }, process.env.JWT_SECRET,{
            expiresIn: "1h"
        })
        return res.status(200).json({result:"success", data:token, userId:exUser.userId})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })
};

// exports.postLogout = (req, res) => {
//         //localStorage.clear();
//         req.session.destory();
//         req.session = null;
//         res.status(200).json({result:"success"})
// }