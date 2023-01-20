const express = require('express');
//const passport = require('passport');

const router = express.Router();

const {getArticles, getGroupArticles} = require("../controller/articleController");


//article controller
router.route("/").get(getArticles)
router.route("/:articlegroup").get(getGroupArticles).post();

module.exports = router;