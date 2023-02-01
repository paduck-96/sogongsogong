const express = require('express');
const {isLoggedIn} = require("./middleware");

const router = express.Router();

const {getArticleWrite, postArticleWrite, getArticleViewAndUpdate, postArticleUpdate, deleteArticle} = require("../controller/articleController");

router.route("/").get(isLoggedIn, getArticleWrite).post(isLoggedIn, postArticleWrite);
router.route("/:articleId").get(getArticleViewAndUpdate).delete(deleteArticle);
router.route("/:articleId/update").put(postArticleUpdate);

module.exports = router;