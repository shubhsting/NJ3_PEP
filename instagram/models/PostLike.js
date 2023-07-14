"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    "PostLike",
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
      userId: {
        type: DataTypes.BIGINT,
      },
    },
    {
      tableName: "post_likes_instagram",
      timestamps: false
    }
  );
  return PostLike;
};
