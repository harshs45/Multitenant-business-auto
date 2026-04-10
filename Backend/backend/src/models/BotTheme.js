const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BotTheme = sequelize.define('BotTheme', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    botId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    themeKey: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Predefined theme key or "custom"',
    },
    customPrimaryColor: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'Brand hex override e.g. #FF5733',
    },
    widgetPosition: {
      type: DataTypes.ENUM('bottom-right', 'bottom-left', 'center'),
      defaultValue: 'bottom-right',
    },
    customCss: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Optional advanced CSS overrides',
    },
  }, {
    tableName: 'bot_themes',
    underscored: true,
  });

  BotTheme.associate = (models) => {
    BotTheme.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return BotTheme;
};
