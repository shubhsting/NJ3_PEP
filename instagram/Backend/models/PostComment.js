"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define(
    "PostComment",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        type: DataTypes.INTEGER,
      },
      commentedBy: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "post_comments_instagram",
      timestamps: false,
    }
  );

  PostComment.associate = function (models) {
    PostComment.belongsTo(models.Post, {
      foreignKey: "postId",
    });
    PostComment.belongsTo(models.User, {
      foreignKey: "commentedBy"
    })
  };
  return PostComment;
};
