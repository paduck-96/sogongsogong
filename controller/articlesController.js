const Article = require("../models/Article")
const Category = require("../models/Category");
const Reaction = require("../models/Reaction");
const User = require("../models/User");
const Sequelize = require("sequelize");

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
      include: [
        {
          model: Category,
          attributes: ["categoryId", "categoryName", "fk_article_category"],
        },
        {
          model: User,
          attributes: ["userId", "nickname"],
        },
      ],
    })

    // 반응 따로 출력
    for (let article of articles) {
      const reactions = await Reaction.findAll({
        where: { fk_article_reaction: article.articleId },
        attributes: [
          "reactionContent"
        ],
      });
      
      const reactionCounts = reactions.reduce((acc, reaction) => {
        acc[reaction.reactionContent] ? acc[reaction.reactionContent] += 1  : acc[reaction.reactionContent] = 1
        return acc;
      }, {});
      article.setDataValue("Reactions", reactionCounts);
    }
  
    // 카테고리 이름 중복 출력 방지
    const uniqueCategories = Array.from(
      new Set(
        articles.flatMap((article) => article.Categories.map((category) => category.categoryName))
      )
    ).map((categoryName) => {
      return articles
        .flatMap((article) => article.Categories)
        .find((category) => category.categoryName === categoryName);
    });

    res.status(200).json({
      result: "success",
      data: {
        articles,
        categories: uniqueCategories,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }  
}

exports.getGroupArticles = async ( req, res, next) => {
    const { articlegroup } = req.params;

    try {
      const categories = await Category.findAll({
        where: {
          categoryName: articlegroup,
          deletedAt: null,
        },
        attributes: ["fk_article_category"],
      });

      if (!categories.length) {
        return res.status(204).json({ result: "fail", data: `${articlegroup} 없음` });
      }
    
      
      const promiseJob = categories.map(async article=>{
        const data = await Article.findOne({
          where:{
            deletedAt:null, 
            articleId:article.fk_article_category
          },
          attributes:[
            "articleId",
            "articleTitle",
            "articleContent",
            "createdAt",
            "updatedAt",
          ],
          include:[
            {
              model: User,
              attributes: ["userId", "nickname"],
            },
            {
              model: Reaction,
              attributes: [
                "reactionContent",
                [Sequelize.fn("count", Sequelize.col("reactionContent")), "count"],
              ],
            },
          ]
        })
        return data;
      })

      const articles = await Promise.all(promiseJob)

      res.status(200).json({
        result: "success",
        message:`${articlegroup} 게시글 조회 완료!`,
        data: {
          articles,
          categoryName: articlegroup,
        },
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
}