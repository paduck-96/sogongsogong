const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
    try {
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            done(null, user);
        } else {
            done(null, false, {
            message: '❌ 잘못된 비밀번호입니다 ❌'
            });
        }
        } else {
            done(null, false, {
                message: '❌ 가입되지 않은 회원입니다 ❌'
            });
        }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};