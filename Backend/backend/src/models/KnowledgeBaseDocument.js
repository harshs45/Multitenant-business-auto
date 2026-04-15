'use strict';
module.exports = (sequelize, DataTypes) => {
  const KnowledgeBaseDocument = sequelize.define(
    'KnowledgeBaseDocument',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      botId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
    },
    {
      tableName: 'kb_documents',
      timestamps: true,
      underscored: true,
    }
  );

  KnowledgeBaseDocument.associate = (models) => {
    KnowledgeBaseDocument.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return KnowledgeBaseDocument;
};
