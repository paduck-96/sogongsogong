const Sequelize = require('sequelize');

module.exports = class Emojis extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      emojiId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      emojiName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      emojiChar: {
        type: Sequelize.STRING(191),
        allowNull: false,
        charset:"utf8mb4",
        collate:"utf8mb4_unicode_ci"
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Emojis',
      tableName: 'Emojis',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });
  }
};