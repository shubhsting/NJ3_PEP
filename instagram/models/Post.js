"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imageURL: {
        type: DataTypes.STRING,
      },
      postContent: {
        type: DataTypes.STRING,
      },
      likesCount: {
        type: DataTypes.BIGINT,
      },
      postedBy: {
        type: DataTypes.BIGINT,
      },
    },
    {
      tableName: "user_posts_instagram",
      timestamps: false
    }
  );
  return Post;
};
