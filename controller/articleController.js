const { ArticleAndCategory } = require("../models");
const Article = require("../models/Article");
const Category = require("../models/Category");
const Emojis = require('../models/Emoji');
const Reaction = require("../models/Reaction")

exports.getArticleWrite = async( req, res, next) => {
    try{
        //
    }
    catch(err){
        console.error(err);
        return next(err);
    }
    return res.status(200).json({result:"success", message:"글쓰기 페이지 출력"})
}
exports.postArticleWrite = async ( req, res, next) => {
    const { articleTitle, articleContent, categoryName, userId } = req.body;

    try {
    if (articleTitle.trim() === "" || articleContent.trim() === "") {
        return res
        .status(400)
        .json({ result: "fail", message: "제목과 내용을 입력해주세요" });
    }
    if (articleTitle.trim().length > 200) {
        return res
        .status(400)
        .json({ result: "fail", message: "제목은 200자를 넘을 수 없습니다" });
    }
    if (articleContent.trim().length > 1024) {
        return res
        .status(400)
        .json({ result: "fail", message: "내용은 1024자를 넘을 수 없습니다" });
    }
    
    // 게시글 생성
    const article = await Article.create({
        articleTitle,
        articleContent,
        fk_user_article: userId
    });

    // 카테고리 이름 분리
    const categories = categoryName.split(",").map((category) => category.trim());
    // 영어 제거
    const englishCategoryRegex = /[A-Za-z]/;
    if (categories.some((category) => englishCategoryRegex.test(category))) {
        return res
            .status(400)
            .json({ result: "fail", message: "카테고리에는 한글만 작성해주세요" });
    }
    // 중복 제거
    const uniqueCategories = [...new Set(categories)];

    // 카테고리 생성 및 게시글과 연결
    for (const category of uniqueCategories) {
        const categoryInstance = await Category.create({
          categoryName:category
        });
    
        await article.addCategory(categoryInstance);
      }

    return res
        .status(201)
        .json({ result: "success", message: "게시글 생성", data: article });
    } catch (err) {
    console.error(err);
    return next(err);
    }
}

exports.getArticleViewAndUpdate = async ( req, res, next) => {
    const {articleId} = req.params;
    try{
        const article = await Article.findOne({
            where:{
                articleId
            },
        })
            const categories = await ArticleAndCategory.findAll({
                where:{
                    articleId
                }
            })
            const categoryArr = [];
            for(let name of categories){
                const data = await Category.findOne({
                    where:{
                        categoryId:name.categoryId
                    },
                    attributes:["categoryName"]
                })
                categoryArr.push(data.categoryName)
            }
        if(article === null){ 
            return res.json({result:"fail", data:"게시글 없음"}).status(204)
        }
            return res.json({result:"success", article, category:categoryArr}).status(200)
    }catch(err){
        console.error(err);
        return next(err);
    }
}

exports.putArticleUpdate = ( req, res, next) => {
    const {articleId} = req.params;
    const  {articleTitle, articleContent } = req.body;
    try{
        if(articleTitle.trim() === "" || articleContent.trim() === ""){
            return res.status(400).json({result:"fail", message:"제목과 내용을 입력해주세요"})
        }
        if(articleTitle.trim().length>200){
            return res.status(400).json({result:"fail", message:"제목은 200자를 넘을 수 없습니다"})
        }
        if(articleContent.trim().length>1024){
            return res.status(400).json({result:"fail", message:"내용은 1024자를 넘을 수 없습니다"})
        }
        const result = Article.update({
            articleTitle,
            articleContent,
        },{
            where:{
                articleId
            }
        },{
            include:Category
        })
        if(result===0){
                const err = new Error("게시글 수정 실패");
                err.statusCode = 404;
                throw err;
        }else{
            return res.status(200).json({result:"success", message:"업데이트 성공"})
        }
        }catch(err){
            console.error(err);
            next(err);
            return res.status(400).json({result:"fail", message:"업데이트 실패"})
    }
}

exports.deleteArticle = async ( req, res, next) => {
    const { articleId} = req.params;
    try{
        const deleteCategory = await ArticleAndCategory.findAll({
            where:{
                articleId
            },
            attributes:["categoryId"]
        })
        for(let category of deleteCategory){
            const data = await Category.findOne({
                where:{
                    categoryId:category.categoryId
                },
                attributes:["categoryName"]
            })
            await Category.destroy({
                where:{
                    categoryName:data.categoryName
                }
            })
        }
        const deleteArticle = await Article.destroy({
            where:{
                articleId
            },
            include:Category
        })
        if(deleteArticle.length === 0){
            return res.status(400).json({result:"fail", message:"삭제 실패"})
        }
        return res.status(200).json({result:"success", message:"삭제 성공"})
    }catch(err){
        console.error(err);
        next(err);
    }
}

// 이모지 창 팝업
exports.getEmojis = async (req, res, next) => {
    const emojis = await Emojis.findAll({
        attributes:["emojiChar"]
    });
    return res.json(emojis);
}

// 이모지 저장
exports.postEmojis = async (req, res, next) => {
    const { emoji, articleId } = req.body;
    try {
        const article = await Article.findOne({
            where:{articleId}
        });
        const reaction = await Reaction.create({
            reactionContent:emoji,
        });
        await article.addReaction(reaction);
        return  res.json({ result:"success", data:reaction});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}