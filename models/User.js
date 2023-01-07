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
    unique:true,
    validate:{
        //닉네임은 3자 이상 15자 이하
        //영어 대소문자와 숫자, 한글만 가능
        is:/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{3,15}$/,
        len:[3, 15]
    }
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
        charset: 'utf8',
        collate: 'utf8_general_ci',
        });
}
static associate(db) {
    db.User.hasMany(db.Article,{
        foreignKey:"fk_user_article",
        sourceKey:"userId"
    })
    }
};