const { ArticleAndCategory } = require("../models");
const Article = require("../models/Article");
const Category = require("../models/Category");

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
    const {articleTitle, articleContent, categoryName} = req.body;
    
    try{
        if(articleTitle.trim() === "" || articleContent.trim() === ""){
            return res.status(400).json({result:"fail", message:"제목과 내용을 입력해주세요"})
        }
        const data = await Article.create({
            articleTitle,
            articleContent,
        },{
            include:Category
        })
        const categories = categoryName.split(",");
        let response = {};
        categories.map(async category=>{
            const result = await Category.create({
                categoryName:category.trim()
            })
            response += await data.addCategory(result.categoryId);
        })
        return res.status(201).json({result:"success", message:"게시글 생성", data:response});
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

exports.postArticleUpdate = ( req, res, next) => {
    const {articleId} = req.params;
    const  {articleTitle, articleContent } = req.body;
    try{
        Article.update({
            articleTitle,
            articleContent,
        },{
            where:{
                articleId
            }
        },{
            include:Category
        })
            return res.status(201).json({result:"success", message:"업데이트 성공"})
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