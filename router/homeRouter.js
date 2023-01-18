const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
isLoggedIn,
isNotLoggedIn
} = require('./middleware');
const { getLogin, postLogin, postRegister, getRegister, getAuth, postLogout } = require("../controller/userController");

router.route("/register").get(getRegister).post(postRegister);
router.use(isNotLoggedIn).route("/login").get(getLogin).post(postLogin);
router.use(isLoggedIn, passport.authenticate('jwt', {session:false})).route("/login/auth").get(getAuth);
router.use(isLoggedIn).route("/logout").post(postLogout);

module.exports = router;