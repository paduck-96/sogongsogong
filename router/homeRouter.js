const express = require('express');
const router = express.Router();

const {
isLoggedIn,
isNotLoggedIn
} = require('./middleware');
const { getLogin, postLogin, postRegister, getRegister } = require("../controller/userController");

router.use(isLoggedIn).route("/login").get(getLogin).post(postLogin);
router.use(isNotLoggedIn).route("/register").get(getRegister).post(postRegister);

module.exports = router;