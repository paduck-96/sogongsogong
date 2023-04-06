const Sequelize = require('sequelize');
module.exports = class Category extends Sequelize.Model {
static init(sequelize) {
    return super.init({
    categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true,
    },
    categoryName:{
        type:Sequelize.STRING(100),
        unique:true,
        allowNull:false,
        defaultValue:"미정"
    }
    }, {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'Category',
        tableName: 'Category',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        });
}
static associate(db) {
    db.Category.belongsTo(db.Article, { foreignKey: "fk_article_category", targetKey:"articleId" });
};
}