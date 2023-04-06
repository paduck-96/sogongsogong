const express = require('express');

const router = express.Router();

const {getArticles, getGroupArticles, getEmojis, postEmojis} = require("../controller/articlesController");


//article controller
router.route("/").get(getArticles)
router.route("/emojis").get(getEmojis).post(postEmojis);
router.route("/:articlegroup").get(getGroupArticles).post();

module.exports = router;