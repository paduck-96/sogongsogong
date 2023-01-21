const express = require('express');
const {isLoggedIn} = require("./middleware");

const router = express.Router();

const {getArticleWrite, postArticleWrite, getArticleViewAndUpdate, postArticleUpdate, deleteArticle} = require("../controller/articleController");

router.route("/").get(getArticleWrite).post(postArticleWrite);
router.route("/:articleId").get(getArticleViewAndUpdate).post(postArticleUpdate).delete(deleteArticle);

module.exports = router;