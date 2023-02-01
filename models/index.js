const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// 사용 DB Import
const User = require('./User');
const Article = require('./Article');
const Category = require('./Category');
const Reaction = require("./Reaction");
const ArticleAndCategory = require("./ArticleAndCategory");

const db = {};

// DB 접속 설정 가져오기
const sequelize = new Sequelize(
config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User = User;
db.Article = Article;
db.Category = Category;
db.Reaction = Reaction;
db.ArticleAndCategory = ArticleAndCategory;

User.init(sequelize);
Article.init(sequelize);
Category.init(sequelize);
Reaction.init(sequelize);
ArticleAndCategory.init(sequelize);

User.associate(db);
Article.associate(db);
Category.associate(db);
Reaction.associate(db);
ArticleAndCategory.associate(db);

module.exports = db;