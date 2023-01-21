const Article = require("../models/Article");
const Category = require("../models/Category");

exports.getArticles =  async (req, res, next) => {
    try{
        const articleList = await Article.findAll({
            include:{
                model:Category,
                as:"categories"
            }
        });
        if(articleList.length===0){
            return res.status(204).json({result:"success", data:null})
        }
        return res.status(200).json({result:"success", data:articleList})
    }catch(error){
        console.error(error);
        return next(error);
    }
}

exports.getGroupArticles = async ( req, res, next) => {
    const {articlegroup} = req.params;
    try{
        const groupArticleList = await Category.findAll({
            where:{
                categoryName:articlegroup
            },
            include:[{
                model: Article,
                as:"articles",
            }],
        })
        if(groupArticleList.length == 0){
            return res.status(204).json({result:"success", data:null})
        }
        return res.status(200).json({result:"success", data:groupArticleList});
    }catch(error){
        console.error(error);
        return next(error);
    }
}