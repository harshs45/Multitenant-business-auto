'use strict';
module.exports = (sequelize, DataTypes) => {
  const KnowledgeBaseFAQ = sequelize.define(
    'KnowledgeBaseFAQ',
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
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'kb_faqs',
      timestamps: true,
      underscored: true,
    }
  );

  KnowledgeBaseFAQ.associate = (models) => {
    KnowledgeBaseFAQ.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return KnowledgeBaseFAQ;
};
