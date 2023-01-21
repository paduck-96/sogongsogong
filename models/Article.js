const Sequelize = require('sequelize');
module.exports = class Article extends Sequelize.Model {
static init(sequelize) {
    return super.init({
    articleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true,
    },
    articleTitle: {
    type: Sequelize.STRING(800),
    allowNull: false,
    validate:{
        len:[1, 200]
    }
    },
    articleContent: {
    type: Sequelize.STRING(4096),
    allowNull: false,
    validate:{
        len:[1, 1024]
    }
    },
    }, {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'Article',
        tableName: 'Article',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
}
static associate(db) {
    db.Article.belongsTo(db.User,
        {foreignKey:"fk_user_article", targetKey:"userId"});
        db.Article.hasMany(db.Reaction,
            {foreignKey:"fk_article_reaction", sourceKey:"articleId"});
    db.Article.belongsToMany(db.Category,{
         as:"categories", through:"ArticleCategory", foreignKey:"articleId", uniqueKey:"articleCategoryId"
    });
}
};