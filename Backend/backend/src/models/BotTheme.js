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
      field: 'bot_id',        // ✅ explicit mapping
    },
    themeKey: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'theme_key',     // ✅ explicit mapping
    },
    customPrimaryColor: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'custom_primary_color', // ✅ explicit mapping
    },
    widgetPosition: {
      type: DataTypes.ENUM('bottom-right', 'bottom-left', 'center'),
      defaultValue: 'bottom-right',
      field: 'widget_position', // ✅ explicit mapping
    },
    customCss: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'custom_css',    // ✅ explicit mapping
    },
    borderRadius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 12,
      field: 'border_radius', // ✅ explicit mapping
    },
    fontStyle: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'Modern',
      field: 'font_style',    // ✅ explicit mapping
    },
  }, {
    tableName: 'bot_themes',
    timestamps: true,         // ✅ removed underscored: true
  });
  BotTheme.associate = (models) => {
    BotTheme.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };
  return BotTheme;
};