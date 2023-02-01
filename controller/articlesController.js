const Article = require("../models/Article")
const Category = require("../models/Category");
const ArticleAndCategory = require("../models/ArticleAndCategory");
const { Op } = require("sequelize");

exports.getArticles =  async (req, res, next) => {
    try{
        const resultArr = await ArticleAndCategory.findAll({
            attributes:["articleId", "categoryId"]
        });
        const articleArr = [];
        const categoryArr = [];
        const categorySet = new Set();
        const articleSet = new Set();
        // 전체 결과 배열에 articleId 와 categoryId로 나뉘어져 있어서
        //각각 값들에 대해 필요한 결과로 출력
        for(let result of resultArr){
            // set에 전체 카테고리 데이터를 삽입
            //중복 제외된 값이기 때문에 추후 이를 활용해 버튼 생성
            const categoryList = await Category.findAll({
                where:{
                    categoryId : result.categoryId,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            })
            for(let category of categoryList){
                categorySet.add(category.categoryName)
            }
            // articleId를 활용해 전체 게시글 출력
            //게시글 당 여러개의 해쉬태그가 있기 때문에 Set 지정
            articleSet.add(result.articleId);
        }
        // for of 안에서 삽입 안되기 때문에 카테고리 버튼 생성은 for of 밖에서
        //set에 저장된 값을 버튼으로 삽입
        for(let category of categorySet){
            categoryArr.push(category);
        }
        for(let article of articleSet){
                const data = await Article.findAll({
                where:{
                    articleId:article,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            });
            if(data[0]!==undefined){
                articleArr.push(data[0])
            }
        }
        // 전체 데이터로 변환
        //프론트 단에서 사용
        if(articleArr.length == 0){
            return res.json({result:"success", category:"카테고리 없음", article:"게시글 없음"}).status(204);
        }
        return res.json({result:"success", category:categoryArr, article:articleArr}).status(200);
    }catch(error){
        console.error(error);
        return next(error);
    }
}

exports.getGroupArticles = async ( req, res, next) => {
    const {articlegroup} = req.params;
    try{
        const categoryArr = await Category.findAll({
            where:{
                categoryName:articlegroup,
                deletedAt:{
                    [Op.is]:null
                }
            },
            attributes:["categoryId"]
        })
        const articleArr = [];
        for(let category of categoryArr){
            const data = await ArticleAndCategory.findAll({
                where:{categoryId:category.categoryId},
                attributes:["articleId"]
            })
            articleArr.push(data[0]);
        }
        const data = [];
        for(let article of articleArr){
            const result = await Article.findAll({
                where:{
                    articleId:article.articleId,
                    deletedAt:{
                        [Op.is]:null
                    }
                }
            })
            data.push(result[0]);
        }
        if(data.length == 0){
            return res.json({result:"success", data:`${articlegroup} 없음`}).status(204);
        }
        return res.json({result:"success", data}).status(200);
    }catch(error){
        console.error(error);
        return next(error);
    }
}