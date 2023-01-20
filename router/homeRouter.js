const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
isLoggedIn,
isNotLoggedIn
} = require('./middleware');
const { getLogin, postLogin, postRegister, getRegister, getAuth, postLogout } = require("../controller/userController");

// user controller
router.route("/register").get(isNotLoggedIn, getRegister).post(isNotLoggedIn, postRegister);
router.route("/login").get(isNotLoggedIn, getLogin).post(isNotLoggedIn, postLogin);
router.route("/login/auth").get(isLoggedIn, passport.authenticate('jwt', {session:false}), getAuth);
router.route("/logout").post(isLoggedIn, postLogout);

module.exports = router;