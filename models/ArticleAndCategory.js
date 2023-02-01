const Sequelize = require('sequelize');
module.exports = class ArticleAndCategory extends Sequelize.Model {
static init(sequelize) {
    return super.init({
    }, {
        sequelize,
        modelName: 'ArticleAndCategory',
        tableName: 'ArticleAndCategory',
        });
}
static associate(db) {
    db.Article.belongsToMany(db.Category,{
         through:"ArticleAndCategory", foreignKey:"articleId"
    });
    db.Category.belongsToMany(db.Article,{
        through:"ArticleAndCategory", foreignKey:"categoryId"
   });
}
};