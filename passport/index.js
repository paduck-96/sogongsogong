const passport = require('passport');
const local = require('./localStrategy');
const jwt = require("./jwtStrategy");
const User = require('../models/user');

module.exports = () => {
    // 사용자 정보 객체를 생성해, 사용자의 이메일 전달
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport.deserializeUser((email, done) => {
        // 전달받은 email를 활용해 DB에 저장
        User.findOne({ where: { email } })
        .then(user => done(null, user))
        .catch(err => done(err));
    });
    local();
    jwt();
};