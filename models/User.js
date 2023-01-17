const { UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = class User extends Sequelize.Model {
static init(sequelize) {
    return super.init({
    userId: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey:true,
    defaultValue:UUIDV4,
    },
    email:{
        type:Sequelize.STRING(250),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
        }
    },
    nickname: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique:true
    },
    password: {
    type: Sequelize.STRING(256),
    allowNull: false,
    },
    socialLogin:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    cashed:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    cahsedDate:{
        type:Sequelize.DATE,
        allowNull:true,
        defaultValue:null,
        validate:{
            isDate:true,
        }
    }
    }, {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'User',
        tableName: 'User',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
}
static associate(db) {
    db.User.hasMany(db.Article,{
        foreignKey:"fk_user_article",
        sourceKey:"userId"
    })
    }
};