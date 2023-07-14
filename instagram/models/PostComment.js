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
        type: DataTypes.BIGINT,
      },
      commentedBy: {
        type: DataTypes.BIGINT,
      },
      content: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "post_comments_instagram",
      timestamps: false
    }
  );
  return PostComment;
};
