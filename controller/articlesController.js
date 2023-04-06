const Article = require("../models/Article")
const Category = require("../models/Category");
const Emojis = require("../models/Emoji");
const Reaction = require("../models/Reaction");
const User = require("../models/User");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

// 무한 스크롤 추가 예정
exports.getArticles =  async (req, res, next) => {
    try {
        const articles = await Article.findAll({
          where: { deletedAt: null },
          attributes: [
            "articleId",
            "articleTitle",
            "articleContent",
            "createdAt",
            "updatedAt",
          ],
        });
      
        const categories = await Category.findAll({
          where: { deletedAt: null },
          attributes: ["categoryId", "categoryName", "fk_article_category"],
        });
      
        const users = await User.findAll({
          attributes: ["userId", "nickname"],
        });
      
        const reactions = await Reaction.findAll({
          attributes: [
            "reactionId",
            "reactionContent",
            "fk_article_reaction",
            [Sequelize.fn("count", Sequelize.col("reactionContent")), "count"],
          ],
          group: ["reactionContent", "fk_article_reaction"],
        });
      
        res.status(200).json({
          result: "success",
          data: {
            articles,
            categories,
            users,
            reactions,
          },
        });
      } catch (error) {
        console.error(error);
        return next(error);
      }
}

exports.getGroupArticles = async ( req, res, next) => {
    // const {articlegroup} = req.params;
    // try{
    //     const categoryArr = await Category.findAll({
    //         where:{
    //             categoryName:articlegroup,
    //             deletedAt:{
    //                 [Op.is]:null
    //             }
    //         },
    //         attributes:["categoryId"]
    //     })
    //     const articleArr = [];
    //     for(let category of categoryArr){
    //         const data = await ArticleAndCategory.findAll({
    //             where:{categoryId:category.categoryId},
    //             attributes:["articleId"]
    //         })
    //         articleArr.push(data[0]);
    //     }
    //     const data = [];
    //     for(let article of articleArr){
    //         const result = await Article.findAll({
    //             where:{
    //                 articleId:article.articleId,
    //                 deletedAt:{
    //                     [Op.is]:null
    //                 }
    //             }
    //         })
    //         data.push(result[0]);
    //     }
    //     if(data.length == 0){
    //         return res.json({result:"success", data:`${articlegroup} 없음`}).status(204);
    //     }
    //     return res.json({result:"success", data}).status(200);
    // }catch(error){
    //     console.error(error);
    //     return next(error);
    // }
    const { articlegroup } = req.params;
  try {
    const category = await Category.findOne({
      where: {
        categoryName: articlegroup,
        deletedAt: null,
      },
      attributes: ["categoryId"],
    });
    if (!category) {
      return res
        .status(204)
        .json({ result: "success", data: `${articlegroup} 없음` });
    }

    const articles = await Article.findAll({
      include: [
        {
          model: Category,
          where: { categoryId: category.categoryId },
          attributes: ["categoryName"],
        },
        {
          model: User,
          attributes: ["userId", "username"],
        },
        {
          model: Reaction,
          attributes: [
            "emoji",
            [Sequelize.fn("count", Sequelize.col("emoji")), "count"],
          ],
          group: ["emoji"],
        },
      ],
      where: { deletedAt: null },
      attributes: [
        "articleId",
        "articleTitle",
        "articleContent",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!articles.length) {
      return res
        .status(204)
        .json({ result: "success", data: `${articlegroup} 게시글 없음` });
    }

    return res.status(200).json({ result: "success", articles });
  } catch (error) {
    console.error(error);
    return next(error);
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
    const article = await Article.findOne({articleId});
    const reaction = await Reaction.create({
      reactionContent:emoji,
    });
    await article.addReaction(reaction);
    res.json({ result:"success", data:reaction});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}