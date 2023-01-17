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
    articleReaction:{
        type:Sequelize.STRING(1020),
        allowNull:false,
        validate:{
            is:/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        }
    }
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
    db.Article.belongsToMany(db.Group,{
         through:"ArticleGroup"
    });
}
};