const Sequelize = require('sequelize');
module.exports = class ArticleGroup extends Sequelize.Model {
static init(sequelize) {
    return super.init({
    groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true,
    },
    groupName:{
        type:Sequelize.STRING(100),
        allowNull:false,
        defaultValue:"미정"
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
    db.ArticleGroup.hasMany(db.Article, {
        foreignKey:"fk_article_group", sourceKey:"groupId"
    })
}
};