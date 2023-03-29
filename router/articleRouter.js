const express = require('express');
const {isAuth} = require("./middleware")

const router = express.Router();

const {getArticleWrite, postArticleWrite, getArticleViewAndUpdate, putArticleUpdate, deleteArticle} = require("../controller/articleController");

router.route("/").get(isAuth, getArticleWrite).post(isAuth, postArticleWrite);
router.route("/:articleId").get(getArticleViewAndUpdate).delete(isAuth, deleteArticle);
router.route("/:articleId/update").get(isAuth, getArticleViewAndUpdate).put(isAuth, putArticleUpdate);

module.exports = router;