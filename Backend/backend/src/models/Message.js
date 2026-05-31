const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "assistant", "system"),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Token usage, latency, model used, etc.",
      },
    },
    {
      tableName: "messages",
      underscored: true,
    },
  );

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, {
      foreignKey: "conversationId",
      as: "conversation",
    });
  };

  return Message;
};
