const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/User');

module.exports = () => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: 'jwt_secret_code',
    }, async (jwtPayload, done) => {
    try {
        console.log(jwtPayload);
    const user = await User.findOne({
        where: {
            id:jwtPayload.id
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