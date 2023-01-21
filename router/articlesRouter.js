const express = require('express');

const router = express.Router();

const {getArticles, getGroupArticles} = require("../controller/articlesController");


//article controller
router.route("/").get(getArticles)
router.route("/:articlegroup").get(getGroupArticles).post();

module.exports = router;