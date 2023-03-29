const express = require('express');
const passport = require('passport');

const router = express.Router();
const { getLogin, postLogin, postRegister, getRegister, postLogout } = require("../controller/userController");

// user controller
router.route("/register").get(getRegister).post(postRegister);
router.route("/login").get(getLogin).post(postLogin);

module.exports = router;