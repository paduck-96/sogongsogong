const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
      
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: 'jwt_secret_code',
        usernameField: 'email',
        passwordField: 'password',
    }, async (jwtPayload, done) => {
    try {
    const user = await User.findOne({
        where: {
            email:jwtPayload.sub
        }
    });
    if (user) {
        done(null, user);
        return;
        }
        done(null,false,{message: '❌ 올바르지 않은 인증정보 ❌'})
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};