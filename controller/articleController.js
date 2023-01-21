const Article = require("../models/Article");
const Category = require("../models/Category");

exports.getArticleWrite = async( req, res, next) => {
    try{}
    catch(err){
        console.error(err);
        return next(err);
    }
    return res.status(200).json({result:"success", message:"글쓰기 페이지 출력"})
}
exports.postArticleWrite = async ( req, res, next) => {
    const {articleTitle, articleContent, categoryName} = req.body;
    try{
        if(articleTitle.trim() === "" || articleContent.trim() === ""){
            return res.status(400).json({result:"fail", message:"제목과 내용을 입력해주세요"})
        }
        const resultArticle = await Article.create({
            articleTitle,
            articleContent
        })
        .catch(err => {
            console.error(err);
            next(err);
        })
        const resultCategory = await Category.create({
            categoryName
        })
        .catch(err => {
            console.error(err);
            next(err);
        })
        console.log(resultArticle, resultCategory)
        return res.status(201).json({result:"success", message:"게시글 생성", data:resultCategory + resultArticle})
    }catch(err){
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
            }
        })
        if(article === null){
            return res.status(204).json({result:"fail", message:"없는 게시글입니다"})
        }
            return res.status(200).json({result:"success", data:article})
    }catch(err){
        console.error(err);
        return next(err);
    }
}

exports.postArticleUpdate = async ( req, res, next) => {
    const {articleId} = req.params;
    const  {articleTitle, articleContent, categoryName } = req.body;
    try{
        const newArticle = await Article.update({
            articleTitle,
            articleContent,
            categoryName,
        },{
            where:{
                articleId
            }
        })
        if(!newArticle){
            return res.status(400).json({result:"fail", message:"업데이트 실패"})
        }
        return res.status(201).json({result:"success", message:"업데이트 성공", data:newArticle})
    }catch(err){
        console.error(err);
        return next(err);
    }
}

exports.deleteArticle = async ( req, res, next) => {
    const { articleId} = req.params;
    try{
        const deleteArticle = await Article.destroy({
            where:{
                articleId
            }
        })
        if(!deleteArticle){
            return res.status(400).json({result:"fail", message:"삭제 실패"})
        }
        return res.status(200).json({result:"success", message:"삭제 성공"})
    }catch(err){
        console.error(err);
        next(err);
    }
}