const Sequelize = require('sequelize');
module.exports = class Reaction extends Sequelize.Model {
static init(sequelize) {
    return super.init({
        reactionId : {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true,
        },
        reactionContent:{
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
        modelName: 'Reaction',
        tableName: 'Reaction',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        });
}
static associate(db) {
    db.Reaction.belongsTo(db.Article,
        {foreignKey:"fk_article_reaction", targetKey:"articleId"});
}
};