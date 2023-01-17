const Sequelize = require('sequelize');
module.exports = class Group extends Sequelize.Model {
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
        modelName: 'Group',
        tableName: 'Group',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
}
static associate(db) {
    db.Group.belongsToMany(db.Article,{
         through:"ArticleGroup"
    });
}
};