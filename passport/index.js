const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    // 사용자 정보 객체를 생성해, 사용자의 아이디를 전달
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        // 전달받은 id를 활용해 DB에 저장
        User.findOne({ where: { id } })
        .then(user => done(null, user))
        .catch(err => done(err));
    });
    local();
};